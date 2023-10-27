import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

const ValidationError = () => {
    const { error } = useSelector(state => state.auth);

    const errorMassage = useCallback(() => {
        return Object.keys(error).map(name => {
            const msg = error[name].join(", ");
            return `${name} - ${msg}`;
        })
    }, [error])
    return error !== null && errorMassage().map(error => (
        <div key={error} className="alert alert-danger m-1 p-1 text-start border-0 " role="alert">
            {error}
        </div>
    ))
}

export default ValidationError