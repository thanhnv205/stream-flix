'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

import useDebounce from './useDebounce'

interface SearchQueryParams {
  paramKey: string
  delay?: number
}

export const useSearchQuery = ({ paramKey, delay = 300 }: SearchQueryParams) => {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get(paramKey) ?? ''

  const [query, setQuery] = useState<string>(initialQuery)
  const debouncedQuery = useDebounce(query, delay)


  const updateUrl = useCallback(() => {
    const url = new URL(window.location.href)
    const params = url.searchParams

    if (debouncedQuery) {
      params.set(paramKey, debouncedQuery)
    } else {
      params.delete(paramKey)
    }

    const pathname = url.pathname === '/' ? '' : url.pathname
    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname || '/'

    if (newUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', newUrl)
    }
  }, [debouncedQuery, paramKey])

  useEffect(() => {
    updateUrl()
  }, [updateUrl])

  // Reset query searchParams change
  useEffect(() => {
    const newQuery = searchParams.get(paramKey) ?? ''
    if (newQuery === query) return
    setQuery(newQuery)
  }, [searchParams, paramKey])

  return {
    query,
    setQuery,
    debouncedQuery
  }
}

export default useSearchQuery