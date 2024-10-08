import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import RealtItem from "./RealtItem";
import { fetchFavorites } from "../http/realtAPI";

const RealtList = observer(({ userId }) => {
    const { realt } = useContext(Context);
    const { user } = useContext(Context)

    // const getBrandNameByProductId = (brandId) => {
    //     const brand = product.brands.find(brand => brand.id === brandId);
    //     return brand.name;
    // }

    const filteredRealts = userId 
        ? realt.realts.filter(realt => realt.user.id === userId) 
        : realt.realts;

        useEffect(() => {
            if (user.userId) {
                fetchFavorites(user.userId).then(data => {  
                    realt.setFavorites(data)
                  })
            }
            
          }, [])

    return (
        <div className=" container">
            {filteredRealts.map(realt => (
                <RealtItem key={realt.id} realtItem={realt} />
            ))}
        </div>
    );
});

export default RealtList;

// const RealtList = observer(() => {
//     const {realt} = useContext(Context)

//     // const getBrandNameByProductId = (brandId) => {
//     //     const brand = product.brands.find(brand => brand.id === brandId);
//     //     return brand.name;
//     // }

//     return (
//             <Row className="d-flex container vh-90">
//                 { realt.realts.map(realt => (
//                     <RealtItem key={realt.id} realtItem={realt} />
//                 ))}
//             </Row>
        
//     )
// })

// export default RealtList

