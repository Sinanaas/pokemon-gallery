import React from 'react'

const PokemonThumbnail = ({id, name, image, type, onClick}) => {
    const style = `thumb-container ${type}`
    return (
        <div className={style} onClick={onClick}>
            <div className="number">
                <small>#0{id}</small>
            </div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonThumbnail