export class ExampleMapper {
  toExampleEntity(item: any) {
    const { ID, Text, MelingoID } = item;
    return {
      id: Number(ID),
      content: Text,
      entry: { id: Number(MelingoID) },
    };
  }
}
