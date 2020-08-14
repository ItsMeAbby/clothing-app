import React from 'react'

function PantCard({ pants, search }) {
  const filteredPants = pants.filter(pant => {
    return pant.tag.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <div className="kurticard">
      {
        filteredPants.map(pant => {
          return (
            <div className="card">
              <div className="container">
                <img className="img" src={pant.pantimg} alt="error" />
              </div>
              <div className="tag">{pant.tag}</div>
              <div className="span"></div>
              <div className="price">Price: Rs. {pant.pantprice}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PantCard
