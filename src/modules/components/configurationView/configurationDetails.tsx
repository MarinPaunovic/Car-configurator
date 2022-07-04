import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
	savedConfigEditAtom,
	summaryAtom,
	carCustomConfiguratorAtom,
	carDefaultConfiguratorSelector,
	configuratorAtom,
	selectedCarAtom
} from 'modules/storage'
import { PopupInfo } from 'modules/components'

export const ConfigurationDetails = () => {
	const { carModel, year } = useRecoilValue(selectedCarAtom)
	const carConfig = useRecoilValue(carDefaultConfiguratorSelector)
	const carCustomConfig = useRecoilValue(carCustomConfiguratorAtom)
	const currentConfigPage = useSetRecoilState(configuratorAtom)
	const summary = useRecoilValue(summaryAtom)
	const savedConfigEdit = useRecoilValue(savedConfigEditAtom)

	return (
		<>
			<div className="configurationDetails__header f f-justify-between">
				<div className="configurationDetails__header__info">
					<div className="configurationDetails__header__info__carModel fs-48 col-dark-gray">{carModel}</div>
					<div className="configurationDetails__header__info__year fs-28 col-light-gray">{year}</div>
				</div>
				<div className="configurationDetails__header__price">
					<PopupInfo
						text="popup informacije"
						className="configurationDetails__header__price__popup col-9d9daf fs-14 f f-align-items-center"
					/>
					<div className="configurationDetails__header__amount col-dark-gray fs-24">120000€</div>
				</div>
			</div>
			{carConfig && (
				<div className="configurationDetails__details g">
					<div className="configurationDetails__details__title col-dark-gray fs-24">Your configuration details</div>
					<div className="f-column">
						{summary || savedConfigEdit ? (
							<>
								<div className="f-column">
									<span className="configurationDetails__details__exterior__title col-ran-gray fs-24 f f-justify-between ">
										Exterior
										{summary && (
											<button className="summary__title__button col-blue fs-14" onClick={() => currentConfigPage(1)}>
												Edit
											</button>
										)}
									</span>

									<div className="configurationDetails__details__exterior__color f f-align-items-center">
										<img
											alt="car color"
											src={require(`images/colors/${carCustomConfig.exterior.color}.png`)}
											style={{ blockSize: '60px', borderRadius: '100%' }}
										/>
										<div className="configurationDetails__details__text col-light-gray fs-20 f f-justify-between">
											<p>{carCustomConfig.exterior.color}</p>
											<p>0€</p>
										</div>
									</div>
									<div className="configurationDetails__details__exterior__wheels f f-align-items-center">
										<img
											alt="car wheels"
											src={require(`images/${carCustomConfig.carModel}/exterior/wheels/${carCustomConfig.exterior.wheels}.png`)}
											style={{ blockSize: '60px' }}
										/>

										<div className="configurationDetails__details__text col-light-gray fs-20 f f-justify-between">
											<div>
												{carCustomConfig.exterior.wheels === 'one' ? (
													<p>22” Magnesium 5-spoke</p>
												) : (
													<p>22” Alloy 10-spoke</p>
												)}
											</div>
											<p>0€</p>
										</div>
									</div>
								</div>
								<div className="configurationDetails__details__interior">
									<span className="configurationDetails__details__exterior__title col-ran-gray fs-24 f f-justify-between">
										Interior{' '}
										{summary && (
											<button className="summary__title__button col-blue fs-14" onClick={() => currentConfigPage(2)}>
												Edit
											</button>
										)}
									</span>

									<div className="configurationDetails__details__exterior__seats f f-align-items-center">
										<img
											alt="car seats"
											src={require(`images/short_seats/${carCustomConfig.interior.seats}.png`)}
											style={{ borderRadius: '100%', blockSize: '60px' }}
										/>
										<div className="configurationDetails__details__text col-light-gray fs-20 f f-justify-between">
											<p>{carCustomConfig.interior.seats}</p>
											<p>0€</p>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="f-column">
									<span className="configurationDetails__details__exterior__title col-ran-gray fs-24">Exterior</span>
									<div className="configurationDetails__details__exterior__color">
										<img
											alt="car color"
											src={require(`images/colors/${carConfig.exterior.color}.png`)}
											style={{ blockSize: '60px', borderRadius: '100%' }}
										/>
										<div className="configurationDetails__details__text col-light-gray fs-20 f f-justify-between">
											<p>{carConfig.exterior.color}</p>
											<p>0€</p>
										</div>
									</div>
									<div className="configurationDetails__details__exterior__wheels f f-align-items-center">
										<img
											alt="car wheels"
											src={require(`images/${carConfig.carModel}/exterior/wheels/${carConfig.exterior.wheels}.png`)}
											style={{ blockSize: '60px' }}
										/>

										<div className="configurationDetails__details__text col-light-gray fs-20 f f-justify-between">
											<div>
												{carConfig.exterior.wheels === 'one' ? <p>22” Magnesium 5-spoke</p> : <p>22” Alloy 10-spoke</p>}
											</div>
											<p>0€</p>
										</div>
									</div>
								</div>
								<div className="configurationDetails__details__interior">
									<span className="configurationDetails__details__exterior__title col-ran-gray fs-24">Interior</span>
									<div className="configurationDetails__details__exterior__seats">
										<img
											alt="car seats"
											src={require(`images/short_seats/${carConfig.interior.seats}.png`)}
											style={{ borderRadius: '100%', blockSize: '60px' }}
										/>
										<div className="configurationDetails__details__text col-light-gray fs-20 f f-justify-between">
											<p>{carConfig.interior.seats}</p>
											<p>0€</p>
										</div>
									</div>
								</div>
							</>
						)}
						<div className="configurationDetails__details__total fs-24 f f-justify-between">
							<span className="col-ran-gray">Total</span>
							<span className="col-dark-gray">120000€</span>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
