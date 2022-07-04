interface Text {
	text: string
	className: string
}

export const PopupInfo = (props: Text) => {
	const { text, className } = props
	return (
		<div className={className}>
			total
			<div
				className="configurationDetails__header__price__wrapper f col-dark-gray bg-col-white"
				style={{ flexDirection: 'column' }}
			>
				<div
					className={'configurationDetails__header__price__info__popup pos-ab bg-col-white'}
					style={className === 'summary__popup fs-14 col-9d9daf' ? { marginTop: '-57px' } : { marginTop: '-64px' }}
				>
					{text}
				</div>
				<span
					className="material-symbols-outlined configurationDetails__header__price__info col-dim-purple"
					style={{ fontSize: '15px', fontVariationSettings: '1' }}
				>
					info
				</span>
			</div>
		</div>
	)
}
