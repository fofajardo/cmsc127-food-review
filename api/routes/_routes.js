import { CatchNotFound } from "../middleware/catchNotFound.js";
import { registerStrategies } from "../middleware/passportStrategies.js";
import { InferAbility } from "../middleware/inferAbility.js";
import { ResponseHelper } from "../middleware/responseHelper.js";

import UserRouter from "./userRoutes.js";
import AuthRouter from "./authRoutes.js";
import FoodEstablishmentRouter from "./foodEstabRoutes.js";
import FoodItemRouter from "./foodItemRoutes.js";
import FoodTypeRouter from "./foodTypeRoutes.js"
import ReviewRouter from "./reviewRoutes.js";

function useFor(aServer) {
    registerStrategies();

    aServer.use(ResponseHelper);
    aServer.use(InferAbility);

    aServer.use("/api/users", UserRouter);
    aServer.use("/api/food-items", FoodItemRouter);
    aServer.use("/api/food-types", FoodTypeRouter);
    aServer.use("/api/food-establisments", FoodEstablishmentRouter);
    aServer.use("/api/auth", AuthRouter);
    aServer.use("/api/reviews", ReviewRouter);
    aServer.use(CatchNotFound);
}

const exports = { useFor };

export default exports;
