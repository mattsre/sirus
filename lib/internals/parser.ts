export interface ParsedRoute {
  routeKey: string;
  paramNames?: string[];
}

class Parser {
  public parseRoute(path: string): ParsedRoute {
    const groups = path.substr(1).split("/");
    const paramNames: string[] = [];
    let resultRegex = "";
    groups.map(v => {
      // ^:\w* - match for route parameters
      // \/name\/([^\/]*)$ - match for real routes - /name/Joe | /name/my.name)is?long@
      const routeParamRegex = "^:w*";
      const param = v.match(routeParamRegex);
      if (param) {
        paramNames.push(param.input.substr(1));
        v = "([^/]*)$";
      }
      resultRegex += `/${v}`;
    });

    // This is a poor solution, needs to be improved
    if (paramNames.length === 0) {
      resultRegex += "$";
    }

    return {
      routeKey: resultRegex,
      paramNames: paramNames
    };
  }
}

export default Parser;
