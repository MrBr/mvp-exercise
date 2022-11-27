import router, { sendData } from "../router";
import { isIdentified } from "../auth";
import { buyProduct, canBuyProduct } from "./middleware";

router.post("/buy", isIdentified, canBuyProduct, buyProduct, sendData);
