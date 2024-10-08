import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import RealtItem from "./RealtItem";
import { fetchFavorites } from "../http/realtAPI";

const RealtList = observer(({ userId, filters }) => {
    const { realt } = useContext(Context);
    const { user } = useContext(Context)

    const allRealts = realt.realts;

    const filteredRealts = userId 
        ? allRealts.filter(realt => realt.user.id === userId)
        : allRealts.filter(realt => {
            const matchesType = filters.typeId ? realt.type.id === filters.typeId : true;
            const matchesDealType = filters.dealTypeId ? realt.dealType.id === filters.dealTypeId : true;
            return matchesType && matchesDealType;
        });

    useEffect(() => {
        if (user.userId) {
            fetchFavorites(user.userId).then(data => {  
                realt.setFavorites(data);
            });
        }
    }, [user.userId, realt]);

    return (
        <div className="container">
            {filteredRealts.map(realt => (
                <RealtItem key={realt.id} realtItem={realt} />
            ))}
        </div>
    );
});

export default RealtList;

