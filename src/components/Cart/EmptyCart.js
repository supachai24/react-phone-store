import React from 'react'

export default function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                    <h1 className="text-capitalize">your currently is <strong style={{color: 'var(--mainYellow)'}}>empty.</strong></h1>
                </div>
            </div>
        </div>
    )
}
