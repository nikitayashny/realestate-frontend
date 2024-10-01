import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import RealtItem from "./RealtItem";

const RealtList = observer(() => {
    const {realt} = useContext(Context)

    // const getBrandNameByProductId = (brandId) => {
    //     const brand = product.brands.find(brand => brand.id === brandId);
    //     return brand.name;
    // }

    return (
            <Row className="d-flex container vh-90">
                { realt.realts.map(realt => (
                    <RealtItem key={realt.id} realtItem={realt} />
                ))}
            </Row>
        
    )
})

export default RealtList

