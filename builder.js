const fs = require("fs")
const path = require("path")
const config = require("./config")

const path_docs = path.join(config.pathdoc.replace(/%PATH/g, process.cwd()))

const SetTitleDocs = (name) => name.replace(/-/g, " ").replace(/\b\w/g, m => m.toUpperCase())
function ScanDocsIndex() {
  return fs.readdirSync(path_docs).map(id => ({
    title: SetTitleDocs(id),
    description: `Read that information ${id}`,
    slug: id,
  }))
}

function listRoot(rootpath) {
  function scanAllFolder(paths) {
    const listroots = fs.readdirSync(paths)
    const configfpth = path.join(paths, "config.json")
    let listDoced = []
    for(let id of listroots) {
      const specFolder = path.join(paths, id)
      if(!!id.split(".").pop() && !fs.lstatSync(specFolder).isFile()) {
        listDoced.push({
          title: SetTitleDocs(path.parse(id).name),
          slug: specFolder.replace(/\\/g, "/"),
          docs: scanAllFolder(specFolder)
        })
      } else if(["mdx","md"].indexOf(id.split(".").pop()) != -1) {
        listDoced.push({
          title: SetTitleDocs(path.parse(id).name),
          slug: specFolder.replace(/\\/g, "/")
        })
      }
    }

    if(fs.existsSync(configfpth)) {
      const dataConfig = JSON.parse(fs.readFileSync(configfpth, "utf-8"))
      let listCostumCfg = []
      Object.entries(dataConfig).forEach(([keySlug, titleDoc]) => {
        const dataStg = listDoced.filter(a => path.parse(a.slug).name === keySlug)[0]
        if(!dataStg) return;
        listCostumCfg.push({
          title: titleDoc,
          slug: dataStg.slug,
          docs: dataStg.docs
        })
      })
      listDoced.filter(a => listCostumCfg.map(b => b.slug).indexOf(a.slug) == -1).forEach(a => {
        listCostumCfg.push(a)
      })
      return listCostumCfg
    }
    return listDoced
  }

  const scannerList = scanAllFolder(rootpath)
  const pathDef = String(path.join(path_docs)).replace(/\\/g, "/")
  const dataPref = JSON.parse(JSON.stringify(scannerList).replaceAll(pathDef, ""))
  return dataPref
}

function BuilderAPIPath() {
  let lists = []
  const dataSc = ScanDocsIndex()
  console.log("List Docs:", dataSc)
  const basePath = config.pathdoc.replace(/%PATH/g, process.cwd())
  for(let a of dataSc) {
    lists.push({
      title: a.title,
      slug: a.slug,
      description: a.description,
      list: listRoot(`${basePath}/${a.slug}`)
    })
  }
  const buildJson = {
    branch: config.branch,
    git: `https://github.com/${config.repository}/tree/${config.branch}${config.pathdoc.replace(/%PATH/g, "")}`,
    raw: `https://github.com/${config.repository}/raw/${config.branch}${config.pathdoc.replace(/%PATH/g, "")}`,
    raw_api: `https://raw.githubusercontent.com/${config.repository}/${config.branch}${config.pathdoc.replace(/%PATH/g, "")}`,
    update_time: new Date().getTime(),
    data: lists
  }
  console.log("BuildJson:", buildJson)

  fs.writeFileSync(config.pathout.replace(/%PATH/g, process.cwd()), JSON.stringify(buildJson), "utf-8")
}
BuilderAPIPath()