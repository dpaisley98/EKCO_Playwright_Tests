import { test, expect } from '@playwright/test';

test('navigation', async ({ page }) => {
  await page.goto('https://www.ek.co');
  const title = page.locator('[class*="title"]');
  const hasMatchingTitle = await title.locator('text=The people who power your possible').count() > 0;
  expect(hasMatchingTitle).toBe(true);
  
  const buttonSelector = 'a[class*="button"] >> text=Log in';
  await page.locator(buttonSelector).nth(1).click();

  const expectedURL = 'https://portal.ek.co/';
  const currentURL = page.url();

  expect(currentURL).toContain(expectedURL);
  const form = page.locator('form[id="login_form"]');
  const isFormVisible = await form.isVisible();

  expect(isFormVisible).toBe(true);
});

test('form errors', async ({ page }) => {
  await page.goto('https://portal.ek.co/');
  
  const form = page.locator('form[id="login_form"]');
  const isFormVisible = await form.isVisible();

  expect(isFormVisible).toBe(true);

  await page.locator('[value="Log In"].btn.btn-primary.login.btn-block').click();

  const emailError = page.locator('#email-error');
  const passwordError = page.locator('#passwd-error');

  const emailErrorText = await emailError.textContent();
  expect(emailErrorText).toContain('Email is required');

  const isEmailErrorVisible = await emailError.isVisible();
  const isPasswdErrorVisible = await passwordError.isVisible();

  expect(isEmailErrorVisible).toBe(true);
  expect(isPasswdErrorVisible).toBe(true);
});

test('invalid email', async ({ page }) => {
  await page.goto('https://portal.ek.co/');
  
  const form = page.locator('form[id="login_form"]');
  const isFormVisible = await form.isVisible();

  expect(isFormVisible).toBe(true);

  await page.locator('#email').fill("email.com");
  await page.locator('[value="Log In"].btn.btn-primary.login.btn-block').click();

  const emailError = page.locator('#email-error');
  const emailErrorText = await emailError.textContent();

  expect(emailErrorText).toContain('Email must be a valid email');
  const isEmailErrorVisible = await emailError.isVisible();
  expect(isEmailErrorVisible).toBe(true);
});