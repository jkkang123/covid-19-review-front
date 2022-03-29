import {stringify,parse} from 'flatted'
import { createTransform } from "redux-persist";

export const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
)