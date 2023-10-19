// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateService } = require("@umijs/openapi")

generateService({
  schemaPath: "http://localhost:8080/v2/api-docs",
  projectName: "xl-api-backend",
  serversPath: "./servers"
})
