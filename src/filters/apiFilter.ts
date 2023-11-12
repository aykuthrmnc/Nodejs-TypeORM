export class ApiFilter {
  protected safeParms: { [key: string]: string[] } = {};
  protected columnMap: { [key: string]: string } = {};
  protected operatorMap: { [key: string]: string } = {};

  transform(request: any): any[] {
    const eloQuery: any[] = [];
    for (const parm in this.safeParms) {
      const operators = this.safeParms[parm];
      const query = request.query[parm];

      if (!query) {
        continue;
      }

      const column = this.columnMap[parm] || parm;

      operators.forEach((operator) => {
        if (query[operator]) {
          eloQuery.push([column, this.operatorMap[operator], query[operator]]);
        }
      });
    }

    return eloQuery;
  }
}
