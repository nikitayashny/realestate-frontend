import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import RealtItem from "./RealtItem";

const RealtList = observer(() => {
    const { realt } = useContext(Context);

    return (
        <div>
            {realt.realts.map(realt => (
                <RealtItem key={realt.id} realtItem={realt} />
            ))}
        </div>
    );
});

export default RealtList;

