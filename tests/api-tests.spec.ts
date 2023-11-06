import { test, expect } from '@playwright/test';

test('register user', async ({ request }) => {
  const response = await request.post(
    'https://reqres.in/api/register',
    {
      data:{
        "email": "eve.holt@reqres.in",
        "password": "pistol"
      },
      headers:{
        "Accept":"application/json"
      }
    }
  );

  expect(response.status()).toBe(200);

  var responseBody = await response.json();
  expect(responseBody).toMatchObject({
    id: expect.any(Number),
    token: expect.any(String),
  });
});

test('login user', async ({ request }) => {
  const response = await request.post(
    'https://reqres.in/api/login',
    {
      data:{
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
      },
      headers:{
        "Accept":"application/json"
      }
    }
  );
  expect(response.status()).toBe(200);

  var responseBody = await response.json();
  expect(responseBody).toMatchObject({
    token: expect.any(String),
  });
});

test('delete user', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/2');
  expect(response.status()).toBe(204);
});

test('get user', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  expect(response.status()).toBe(200);

  var responseBody = await response.json();
  expect(responseBody).toMatchObject(
  {
    data:{
      id: expect.any(Number),
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      avatar: expect.any(String)
    },
    support:{
      url: expect.any(String),
      text: expect.any(String)
    }
  });
});

test('update user', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2',
    {
      data:{
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
      },
      headers:{
        "Accept":"application/json"
      }
    }
  );
  expect(response.status()).toBe(200);
  
  var responseBody = await response.json();
  expect(responseBody).toMatchObject(
  {
    name: expect.any(String),
    job: expect.any(String),
    updatedAt: expect.any(String)
  });
});
