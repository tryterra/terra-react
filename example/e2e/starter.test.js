const testConfig = [
  'initTerra',
  'initConnection',
  'getActivity',
  'getAthlete',
  'getBody',
  'getDaily',
  'getMenstruation',
  'getNutrition',
  'getSleep',
];

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        health: 'YES',
      },
    });
  });

  it('Welcome text', async () => {
    await expect(element(by.text('Hello from Terra'))).toBeVisible();
  });

  testConfig.forEach((c) =>
    it(`.${c}`, async () => {
      await waitFor(element(by.text(`${c}: true`)))
        .toBeVisible()
        .withTimeout(20000);
    })
  );
});
