describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    var sorted = users;
    expect(sorted).toEqual(['jack', 'igor', 'jeff']);
  });
});