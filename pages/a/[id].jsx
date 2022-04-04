import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AA() {

    let router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            console.log(id)
            // run something
        }
    }, [id])

    return (
        <div>
            {id}
        </div>
    )
}
