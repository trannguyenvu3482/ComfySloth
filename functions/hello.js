const items = [{ id: 1, name: 'John', age: 18 }];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
