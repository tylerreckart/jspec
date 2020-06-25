describe('The base test suite', () => {
  it('Should pass an equality check', () => {
    expect(1).toEqual(1);
  });

  it('Should fail an equality check', () => {
    expect(true).toEqual(false);
  });
});

