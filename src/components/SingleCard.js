import style from "./SingleCard.module.css"

export default function SingleCard(props) {
    const handleClick = () => {
        if (!props.disabled) {
            props.handleClick(props.card)
        }
    }

    return (
        <div className={style.card}>
            <div className={props.flipped ? style.flipped : ""}>
                <img className={style.front} src={props.card.src} alt="card front" />
                <img className={style.back} src="/img/cover.png" onClick={handleClick} alt="cover" />
            </div>
        </div>
    )
}