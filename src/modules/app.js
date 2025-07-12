import { once } from "lodash-es"

//astro island 導致多個vue instance
const onlyOnce = once((app) => {})

export default (app) => {
  if (!import.meta.env.SSR) onlyOnce(app)
}
