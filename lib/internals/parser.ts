class Parser {
  public parseRoute(path: string): string {
    const groups = path.substr(1).split("/");
    let resultRegex = "";
    groups.map(v => {
      // ^:\w* - match for route parameters
      // \/name\/([^\/]*)$ - match for real routes - /name/Joe | /name/my.name)is?long@
      if (v.match(/^:\w*/)) {
        v = "([^/]*)$";
      }
      resultRegex += `/${v}`;
    });

    resultRegex += "$";

    return resultRegex;
  }
}

export default Parser;
