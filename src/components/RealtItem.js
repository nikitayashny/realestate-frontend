import { Card, Col, Image } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { REALT_ROUTE } from "../utils/consts";


const RealtItem = ({realt}) => {    // , brand (так было)
    const navigate = useNavigate()
    
    return (
        <Col md={12} className="mt-3" onClick={() => navigate(REALT_ROUTE + '/' + realt.id)}>
            <Card style={{cursor: 'pointer', background: "#FFF", height: ""}} border={"dark"}>
                <div class="row g-0">
                    <div class="col-md-5">
                        <img style={{height: "280px", width: "450px"}} src={`data:image/jpeg;base64,${realt.images[0].bytes}`} alt="Image" />    
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">{realt.name}</h5>   
                            <p className="card-text">{realt.dealType.id === 1 ? `${realt.price} $/мес.`  : realt.dealType.id === 2 ? `${realt.price} $.` : null}</p>
                            <p className="card-text">{realt.type.id === 1 ? `Квартира ${realt.area} м²`  : realt.type.id === 2 ? `Дом ${realt.area} м²` : null}</p>
                            <p className="card-text">{`Количество комнат: ${realt.roomsCount}`}</p>
                            <p class="card-text">{`${realt.country}, г. ${realt.city}, ул.${realt.street}, д.${realt.house}`}</p> 
                        </div>
                    </div>
                </div>
            </Card>          
        </Col>
    )
}

export default RealtItem