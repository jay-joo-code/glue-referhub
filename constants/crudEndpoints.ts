import prisma from "lib/glue/prisma"

const crudEndpoints = {
  company: { model: prisma.company },
}

export default crudEndpoints
