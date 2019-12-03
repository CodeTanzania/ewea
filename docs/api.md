# Overview

## Introduction

This API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). The API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

> Base URL

```curl
https://api.ewea.io/v1
```

Throughout this document, some example API requests will be given using the `curl` command. This will allow us to demonstrate the various endpoints in a simple, textual format.

If you need access to the headers of a response through `curl`, you can pass the `-i` flag to display the header information along with the body. If you are only interested in the header, you can instead pass the `-I` flag, which will exclude the response body entirely.

## Requests

Requests should be made using the `HTTPS protocol` so that traffic is encrypted. Calls made over plain HTTP will fail. API requests without authentication will also fail.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The commonly used HTTP request headers are:

`Accept:` Required to specify response format.<br/>
`Content-Type:` Required specify request body format.<br/>
`Authorization:` Required to provide API key.

> Example Request Headers

```curl
Accept: application/json
Content-Type: application/json
Authorization: Bearer <apiKey>
```

## Responses

When a request is successful, a response body will typically be sent back in the form of a JSON object.

If you send a request to specific resource e.g `https://api.ewea.io/v1/events/:id` you will get back an object with its `keys` representing properties of that specific resource.

> Example Single Object Response:

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "type": "Strong Winds",
  "areas": "Tandale, Kigogo",
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

If you send a request to general collection e.g `https://api.ewea.io/v1/events` you will get back an object with `data` key which represent set of found resources.

> Example Object Collection Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{ ... }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

Errors are returned in JSON format. A `status`, `code`, `name` and `message` parameter are returned for each error message.

> Example Error Response:

```curl
HTTP/1.1 400 Bad Request
{
  "status": 400,
  "code": "400",
  "name": "Error",
  "message" : "Bad Request",
  "description" : "Bad Request"
}
```

## HTTP Statuses

This API uses conventional `HTTP status codes` to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted etc.). Codes in the `5xx` range indicate an error with API servers (these are rare).

<br/>

|            Code             |                                           Description                                            |
| :-------------------------: | :----------------------------------------------------------------------------------------------: |
|          200 - OK           |                                  Everything worked as expected.                                  |
|        201 - Created        |                    The request was a success and resource have been created.                     |
|      400 - Bad Request      |             The request was unacceptable, often due to missing a required parameter.             |
|     401 - Unauthorized      |                              No valid API key provided or missing.                               |
|       403 - Forbidden       |              API key provided doesn’t have permission to access specified resource.              |
|       404 - Not Found       |                              The requested resource doesn't exist.                               |
|  405 - Method Not Allowed   |                  The requested resource does not support the HTTP method used.                   |
|       409 - Conflict        |                           The request conflicts with another request.                            |
|   429 - Too Many Requests   | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
| 500 - Internal Server Error |                    Something went wrong on API Server end. (These are rare.)                     |
|      502 - Bad Gateway      |                      Upstream payment processor(gateway) returned an error.                      |
|  503 - Service Unavailable  |                                       Server maintenance.                                        |
|    504 - Gateway Timeout    |                   Upstream payment processor(gateway) fail to respond in time.                   |

## HTTP Methods

This API uses appropriate HTTP verbs for every action.

| Method |                         Description                          |
| :----: | :----------------------------------------------------------: |
|  GET   |                Used for retrieving resources.                |
|  POST  | Used for creating resources and performing resource actions. |
|  PUT   |                 Used for updating resources.                 |
| PATCH  |                 Used for updating resources.                 |
| DELETE |                 Used for deleting resources.                 |

## Authentication

This API uses API keys to authenticate requests. Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed via `HTTP Bearer Auth`.

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/events \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "type": "Strong Winds",
    "area":"Tandale, Kigogo"
  }'
```

## Sorting

All top-level API resources have support `sort` on `list` API methods. To sort
the the result of `list` send request with `sort` query parameter.

> Example Sorting Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events?sort=type \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The sort order for each `sort` field is `ascending order` unless it is prefixed with a `minus ("-"")`, in which case it will be `descending order`.

> Example Sorting Order Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events?sort=-createdAt,type \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

## Pagination

All top-level API resources have support for bulk fetches via `list` API methods. These list API methods share a common structure, taking at least these three parameters: `limit`, `skip`, and `page`.

> Example Request:

```curl
curl --request GET \
--url https://api.ewea.io/v1/events?page=1&skip=0&limit=10 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

## Filtering

All top-level API resources have support `filter` on `list` API methods. The `filter` query parameter is reserved for filtering data.

To filter the the result of `list` send request with `filter` query parameter.

> Example Filter Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events?filter[type]=Strong Winds \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The `filter` support common [MongoDB](https://docs.mongodb.com/manual/reference/operator/query/index.html) query operators.

> Example Filter Query Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events?filter[type][$eq]=["Strong Winds"] \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

## CORS

In order to make requests to the API from other domains, the API implements `Cross Origin Resource Sharing (CORS)` support.

You should not need to be concerned with the details of these headers, because the `browser` or `http library` will typically do all of the work for you.

> Example Preflight Request

```curl
curl -I --request OPTIONS \
--url https://api.ewea.io/v1/events \
--header 'Origin: https://example.com'
```

## Rate Limit

The number of requests that can be made through the API are currently limited to `5,000 per hour per API token`.

The rate limiting information contained within the response headers are:

`RateLimit-Limit:` Number of requests that can be made per hour.
`RateLimit-Remaining:` Number of requests remain before hit request limit.
`RateLimit-Reset:` Time when the oldest request will expire.

> Example Rate Limit Response Headers

```curl
RateLimit-Limit: 1200
RateLimit-Remaining: 1193
RateLimit-Reset: 1402425459
```

As long as the `RateLimit-Remaining` count is above zero, requests can be made. If reaches zero, subsequent requests will receive a `429 HTTP Status Code` until the request reset has been reached.

> Example Rate Limit Error Response

```curl
HTTP/1.1 429 Too Many Request
{
  "status": 429,
  "code": "429",
  "name": "Error",
  "message" : "Too Many Request",
  "description" : "Too Many Request"
}
```

## Versioning

When backwards-incompatible changes applied to the API, new version is released. The current version is `v1`.

To set the API version on a specific request, append version on request url. As a precaution, use API versioning to test a new API version before committing to an upgrade.

> Example Request:

```curl
curl --request GET \
--url https://api.ewea.io/v1/events \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

# Core Resources

## Authentication

### Signin

To signin, send a `POST` request to `https://api.ewea.io/v1/signin`. The following attributes are supported:

<br/>

|   Name   |  Type  |                  Description                  | Required |
| :------: | :----: | :-------------------------------------------: | :------: |
| Username | String |     Registered `email` or `phone number`      |   True   |
| Password | String | Registered passkey used authenticate a party. |   True   |

> Example Request:

```curl
curl --request POST \
--url https://api.ewea.io/v1/signin \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--body '{
    "username": "test@example.com",
    "password": "1234567890"
  }'
```

The response will be a `JSON object` with the following attributes:

|  Name   |  Type   |                    Description                    |
| :-----: | :-----: | :-----------------------------------------------: |
| success | Boolean |               Authentication State                |
|  party  | Object  | Contains information of the authenticated `Party` |
|  token  | String  |         JWT for the authenticated `Party`         |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "success":true,
  "party": {
    "type": "Focal Person",
    "name": "John Doe",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
    "_id": "5ddfadfd8fadd0276378b0d6",
    "updatedAt": "2019-11-28T11:22:37.254Z",
    "createdAt": "2019-11-28T11:22:37.199Z",
    "lockedAt": null
  },
  "token": "gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI",
}

```

## Party

`Party` A representation of an entity (e.g municipal, individual, agency,
organization etc) consisting of contact information (e.g. name, e-mail
addresses, phone numbers) and other descriptive information of interest in
emergency(or disaster) management.

It may be a self managed entity or division within another entity(party) in case there is hierarchy.

### Party Schema

`Party` have the following attributes:

<br />

|      Name       |  Type  |                                             Description                                             |
| :-------------: | :----: | :-------------------------------------------------------------------------------------------------: |
|      \_id       | String |                             Unique universal identifier of this party.                              |
|      party      | String |  Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).   |
|      type       | String |                                   Human readable type of a party.                                   |
|      group      | String |                                  Human readable group of a party.                                   |
|      name       | Object |                                   Human readable name of a party.                                   |
|  abbreviation   | String |                             Human readable short form of a party name.                              |
|     locale      | string |              Defines the party's language, region and any special variant preferences.              |
|      email      | String |                           Primary email address used to contact a party.                            |
|     mobile      | String |                        Primary mobile phone number used to contact a party.                         |
|    landline     | String |               Primary main-line(or fixed-line) phone number used to contact a party.                |
|       fax       | String |                             Primary fax number used to contact a party.                             |
|     website     | String |                              Primary website url(or link) of a party.                               |
| physicalAddress | String |                              Primary physical address of party office.                              |
|  postalAddress  | String |                               Primary postal address of party office.                               |
|     centre      | Object |               A geo-location coordinates of a party main office or area of operation.               |
|      area       | String |                 Geographical location of a party main office or area of operation.                  |
|      role       | String |                                Assignable or given role to a party.                                 |
|    createdAt    | String | A time value given in ISO8601 combined date and time format that represents when party was created. |
|    updatedAt    | String | A time value given in ISO8601 combined date and time format that represents when party was updated. |

### Create Party

To create a new event group, send a `POST` request to `https://api.ewea.io/v1/parties`. The following attributes are supported:

<br />

|      Name       |  Type  |                                           Description                                            | Required |
| :-------------: | :----: | :----------------------------------------------------------------------------------------------: | :------: |
|      party      | String | Top party(i.e company, organization etc) under which a party is derived(or member, part of etc). |  false   |
|      type       | String |                                 Human readable type of a party.                                  |  false   |
|      group      | String |                                 Human readable group of a party.                                 |  false   |
|      name       | Object |                                 Human readable name of a party.                                  |   true   |
|  abbreviation   | String |                            Human readable short form of a party name.                            |  false   |
|     locale      | string |            Defines the party's language, region and any special variant preferences.             |  false   |
|      email      | String |                          Primary email address used to contact a party.                          |   true   |
|     mobile      | String |                       Primary mobile phone number used to contact a party.                       |   true   |
|    landline     | String |              Primary main-line(or fixed-line) phone number used to contact a party.              |  false   |
|       fax       | String |                           Primary fax number used to contact a party.                            |  false   |
|     website     | String |                             Primary website url(or link) of a party.                             |  false   |
| physicalAddress | String |                            Primary physical address of party office.                             |  false   |
|  postalAddress  | String |                             Primary postal address of party office.                              |  false   |
|     centre      | Object |             A geo-location coordinates of a party main office or area of operation.              |  false   |
|      area       | String |                Geographical location of a party main office or area of operation.                |  false   |
|      role       | String |                               Assignable or given role to a party.                               |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/parties \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "mobile": "231789321212"
  }'
```

The response will be a `JSON object` with the standard party attributes:

|     Name     |  Type  |                                                Description                                                 |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                 Unique universal identifier of this party.                                 |
|     type     | String |                                      Human readable type of a party.                                       |
|     name     | Object |                                      Human readable name of a party.                                       |
| abbreviation | String |                                 Human readable short form of a party name.                                 |
|    locale    | string |                 Defines the party's language, region and any special variant preferences.                  |
|    email     | String |                               Primary email address used to contact a party.                               |
|    mobile    | String |                            Primary mobile phone number used to contact a party.                            |
|  createdAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|  updatedAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|   lockedAt   | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response

```curl
HTTP/1.1 201 Success
{
    "type": "Focal Person",
    "name": "John Doe",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
    "_id": "5ddfadfd8fadd0276378b0d6",
    "updatedAt": "2019-11-28T11:22:37.254Z",
    "createdAt": "2019-11-28T11:22:37.199Z",
    "lockedAt": null
}
```

### Retrieve Party

To get a party, send a `GET` request to `https://api.ewea.io/v1/parties/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/parties/5ddfadfd8fadd0276378b0d6 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party attributes:

<br/>

|     Name     |  Type  |                                                Description                                                 |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                 Unique universal identifier of this party.                                 |
|     name     | Object |                                      Human readable name of a party.                                       |
|     type     | String |                                      Human readable type of a party.                                       |
| abbreviation | String |                                 Human readable short form of a party name.                                 |
|    locale    | string |                 Defines the party's language, region and any special variant preferences.                  |
|    email     | String |                               Primary email address used to contact a party.                               |
|    mobile    | String |                            Primary mobile phone number used to contact a party.                            |
|  createdAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|  updatedAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|   lockedAt   | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "type": "Focal Person",
  "name": "John Doe",
  "abbreviation": "JD",
  "locale": "en",
  "email": "john.doe@example.com",
  "mobile": "255789321212",
  "_id": "5ddfadfd8fadd0276378b0d6",
  "updatedAt": "2019-11-28T11:22:37.254Z",
  "createdAt": "2019-11-28T11:22:37.199Z",
  "lockedAt": null
}
```

### Update Party

To update existing party, send a `PATCH` request to `https://api.ewea.io/v1/parties/:id`. The following attributes are supported:

<br/>

| Name |  Type  |           Description           |
| :--: | :----: | :-----------------------------: |
| name | Object | Human readable name of a party. |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/parties/5ddfadfd8fadd0276378b0d6 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "name": "John Dae"
  }'
```

The response will be a `JSON object` with the standard party attributes:

<br/>

|     Name     |  Type  |                                                Description                                                 |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                 Unique universal identifier of this party.                                 |
|     name     | Object |                                      Human readable name of a party.                                       |
|     type     | String |                                      Human readable type of a party.                                       |
| abbreviation | String |                                 Human readable short form of a party name.                                 |
|    locale    | string |                 Defines the party's language, region and any special variant preferences.                  |
|    email     | String |                               Primary email address used to contact a party.                               |
|    mobile    | String |                            Primary mobile phone number used to contact a party.                            |
|  createdAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|  updatedAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|   lockedAt   | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "type": "Focal Person",
  "name": "John Dae",
  "abbreviation": "JD",
  "locale": "en",
  "email": "john.doe@example.com",
  "mobile": "255789321212",
  "_id": "5ddfadfd8fadd0276378b0d6",
  "updatedAt": "2019-11-28T12:00:38.597Z",
  "createdAt": "2019-11-28T11:22:37.199Z",
  "lockedAt": null
}
```

### Delete Party

To delete existing party, send a `DELETE` request to `https://api.ewea.io/v1/parties/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/parties/5ddfadfd8fadd0276378b0d6 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party attributes:

<br/>

|     Name     |  Type  |                                                 Description                                                 |
| :----------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                 Unique universal identifier of this party.                                  |
|     name     | Object |                                       Human readable name of a party.                                       |
|     type     | String |                                       Human readable type of a party.                                       |
| abbreviation | String |                                 Human readable short form of a party name.                                  |
|    locale    | string |                  Defines the party's language, region and any special variant preferences.                  |
|    email     | String |                               Primary email address used to contact a party.                                |
|    mobile    | String |                            Primary mobile phone number used to contact a party.                             |
|  createdAt   | String |     A time value given in ISO8601 combined date and time format that represents when party was created.     |
|  updatedAt   | String |     A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|   lockedAt   | String | A time value given in ISO8601 combined date and time format that represents when party account was locked.  |
|  deletedAt   | String | A time value given in ISO8601 combined date and time format that represents when party account was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
    "type": "Focal Person",
    "name": "John Dae",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
    "_id": "5ddfadfd8fadd0276378b0d6",
    "updatedAt": "2019-11-28T12:07:33.736Z",
    "createdAt": "2019-11-28T11:22:37.199Z",
    "lockedAt": null,
    "deletedAt": "2019-11-28T12:07:33.717Z"
}
```

### List All Parties

To list all parties, send a `GET` request to `https://api.ewea.io/v1/parties`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/parties \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of the standard party attributes:

<br/>

|     Name     |  Type  |                                                Description                                                 |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                 Unique universal identifier of this party.                                 |
|     name     | Object |                                      Human readable name of a party.                                       |
|     type     | String |                                      Human readable type of a party.                                       |
| abbreviation | String |                                 Human readable short form of a party name.                                 |
|    locale    | string |                 Defines the party's language, region and any special variant preferences.                  |
|    email     | String |                               Primary email address used to contact a party.                               |
|    mobile    | String |                            Primary mobile phone number used to contact a party.                            |
|  createdAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|  updatedAt   | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|   lockedAt   | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "type": "Focal Person",
    "name": "John Dae",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
    "_id": "5ddfadfd8fadd0276378b0d6",
    "updatedAt": "2019-11-28T12:00:38.597Z",
    "createdAt": "2019-11-28T11:22:37.199Z",
    "lockedAt": null
  },
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## PartyRole

> TODO

## PartyGroup

`PartyGroup` group of parties based on a well know kinds or types they fall into.
eg. Government Agencies, Ambulance Services etc...

### PartyGroup Schema

`PartyGroup` have the following attributes:

<br />

|    Name     |  Type  |                                                  Description                                                  |
| :---------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party group.                                |
| description | Object |                         Human-translatable-readable description for the party group.                          |
|    name     | Object |                             Human-translatable-readable name for the party group.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party groups visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was updated. |

### Create PartyGroup

To create a new party group, send a `POST` request to `https://api.ewea.io/v1/predefines/partygroups`. The following attributes are supported:

<br/>

|    Name     |  Type  |                                   Description                                   | Required |
| :---------: | :----: | :-----------------------------------------------------------------------------: | :------: |
| description | Object |          Human-translatable-readable description for the party group.           |  false   |
|    name     | Object |              Human-translatable-readable name for the party group.              |   true   |
|    color    | String | A color code(in hexadecimal format) used to differentiate party group visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/partygroups \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "description": { "en": "Group of Agencies belonging to the government" },
    "name": { "en": "Government Agencies" },
    "color": "#86C7E8"
  }'
```

The response will be a `JSON object` with the standard party group attributes:

<br/>

|    Name     |  Type  |                                                  Description                                                  |
| :---------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party group.                                |
| description | Object |                         Human-translatable-readable description for the party group.                          |
|    name     | Object |                             Human-translatable-readable name for the party group.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party groups visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
 "description": { "en": "Group of Agencies belonging to the government" },
 "name": { "en": "Government Agencies" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve PartyGroup

To get a party group, send a `GET` request to `https://api.ewea.io/v1/predefines/partygroups/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/partygroups/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party group attributes:

<br/>

|    Name     |  Type  |                                                  Description                                                  |
| :---------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party group.                                |
| description | Object |                         Human-translatable-readable description for the party group.                          |
|    name     | Object |                             Human-translatable-readable name for the party group.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party groups visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "description": { "en": "Group of Agencies belonging to the government" },
  "name": { "en": "Government Agencies" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update PartyGroup

To update existing party group, send a `PATCH` request to `https://api.ewea.io/v1/predefines/partygroups/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                         Description                          | Required |
| :---------: | :----: | :----------------------------------------------------------: | :------: |
| description | Object | Human-translatable-readable description for the party group. |
|    name     | Object |    Human-translatable-readable name for the party group.     |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/partygroups/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "description": { "en": "Group of Agencies belonging to the government" },
     "name": { "en": "Government Agencies" },
  }'
```

The response will be a `JSON object` with the standard party group attributes:

<br/>

|    Name     |  Type  |                                                  Description                                                  |
| :---------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party group.                                |
| description | String |                             Unique Human-readable given code of this party group.                             |
|    name     | Object |                             Human-translatable-readable name for the party group.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party groups visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
 "description": { "en": "Group of Agencies belonging to the government" },
  "name": { "en": "Government Agencies" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete PartyGroup

To delete existing party group, send a `DELETE` request to `https://api.ewea.io/v1/predefines/partygroups/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/partygroups/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party group attributes:

<br/>

|    Name     |  Type  |                                                  Description                                                  |
| :---------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party group.                                |
| description | Object |                         Human-translatable-readable description for the party group.                          |
|    name     | Object |                             Human-translatable-readable name for the party group.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party groups visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "description": { "en": "Group of Agencies belonging to the government" },
  "name": { "en": "Government Agencies" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### List All PartyGroup

To list all party groups, send a `GET` request to `https://api.ewea.io/v1/predefines/partygroups`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/partygroups \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of party group with the standard party group attributes:

<br/>

|    Name     |  Type  |                                                  Description                                                  |
| :---------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party group.                                |
| description | Object |                         Human-translatable-readable description for the party group.                          |
|    name     | Object |                             Human-translatable-readable name for the party group.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party groups visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95b",
     "description": { "en": "Group of Agencies belonging to the government" },
     "name": { "en": "Government Agencies" },
    "color": "#86C7EE"
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## EventGroup

`EventGroup` group emergency events based on the nature they fall into. i.e
Meteorological, Hydrological, Biological e.t.c

### EventGroup Schema

`EventGroup` have the following attributes:

<br />

|   Name    |  Type  |                                                  Description                                                  |
| :-------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event group.                                |
|   code    | String |                             Unique Human-readable given code of this event group.                             |
|   name    | Object |                             Human-translatable-readable name for the event group.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event groups visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was updated. |

### Create EventGroup

To create a new event group, send a `POST` request to `https://api.ewea.io/v1/predefines/eventgroups`. The following attributes are supported:

<br/>

| Name  |  Type  |                                   Description                                   | Required |
| :---: | :----: | :-----------------------------------------------------------------------------: | :------: |
| code  | String |              Unique Human-readable given code of this event group.              |  false   |
| name  | Object |              Human-translatable-readable name for the event group.              |   true   |
| color | String | A color code(in hexadecimal format) used to differentiate event group visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventgroups \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "code": "H",
    "name": { "en": "Hydrological" },
    "color": "#86C7E8"
  }'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                  |
| :-------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event group.                                |
|   code    | String |                             Unique Human-readable given code of this event group.                             |
|   name    | Object |                             Human-translatable-readable name for the event group.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event groups visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "code": "H",
  "name": { "en": "Hydrological" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve EventGroup

To get a event group, send a `GET` request to `https://api.ewea.io/v1/predefines/eventgroups/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventgroups/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                  |
| :-------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event group.                                |
|   code    | String |                             Unique Human-readable given code of this event group.                             |
|   name    | Object |                             Human-translatable-readable name for the event group.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event groups visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "code": "H",
  "name": { "en": "Hydrological" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update EventGroup

To update existing event group, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventgroups/:id`. The following attributes are supported:

<br/>

| Name |  Type  |                      Description                      | Required |
| :--: | :----: | :---------------------------------------------------: | :------: |
| name | Object | Human-translatable-readable name for the event group. |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventgroups/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "name": { "en": "Hydrological" },
  }'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                  |
| :-------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event group.                                |
|   code    | String |                             Unique Human-readable given code of this event group.                             |
|   name    | Object |                             Human-translatable-readable name for the event group.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event groups visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "code": "H",
  "name": { "en": "Hydrological" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete EventGroup

To delete existing event group, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventgroups/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventgroups/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                  |
| :-------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event group.                                |
|   code    | String |                             Unique Human-readable given code of this event group.                             |
|   name    | Object |                             Human-translatable-readable name for the event group.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event groups visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "code": "H",
  "name": { "en": "Hydrological" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### List All EventGroup

To list all event groups, send a `GET` request to `https://api.ewea.io/v1/predefines/eventgroups`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventgroups \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event group with the standard event group attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                  |
| :-------: | :----: | :-----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event group.                                |
|   code    | String |                             Unique Human-readable given code of this event group.                             |
|   name    | Object |                             Human-translatable-readable name for the event group.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event groups visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95b",
    "code": "H",
    "name": { "en": "Hydrological" },
    "color": "#86C7EE"
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## EventType

`EventType` classify emergency events from the most generalised(nature and family) to the most specific (main event and peril).

### EventType Schema

`EventType` have the following attributes:

<br/>

|   Name    |  Type  |                                                 Description                                                  |
| :-------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event type.                                |
|   code    | String |                             Unique Human-readable given code of this event type.                             |
|   name    | Object |                             Human-translatable-readable name for the event type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event types visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

### Create EventType

To create a new event type, send a `POST` request to `https://api.ewea.io/v1/predefines/eventtypes`. The following attributes are supported:

<br/>

| Name  |  Type  |                                   Description                                   | Required |
| :---: | :----: | :-----------------------------------------------------------------------------: | :------: |
| code  | String |              Unique Human-readable given code of this event type.               |  false   |
| name  | Object |              Human-translatable-readable name for the event type.               |   true   |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventtypes \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
  }'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|   Name    |  Type  |                                                 Description                                                  |
| :-------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event type.                                |
|   code    | String |                             Unique Human-readable given code of this event type.                             |
|   name    | Object |                             Human-translatable-readable name for the event type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event types visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Retrieve EventType

To get a eventtype, send a `GET` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|   Name    |  Type  |                                                 Description                                                  |
| :-------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event type.                                |
|   code    | String |                             Unique Human-readable given code of this event type.                             |
|   name    | Object |                             Human-translatable-readable name for the event type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event types visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Update EventType

To update existing event type, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`. The following attributes are supported:

<br/>

| Name |  Type  |                     Description                      | Required |
| :--: | :----: | :--------------------------------------------------: | :------: |
| name | Object | Human-translatable-readable name for the event type. |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "name": { "en": "Strong Winds" },
  }'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|   Name    |  Type  |                                                 Description                                                  |
| :-------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event type.                                |
|   code    | String |                             Unique Human-readable given code of this event type.                             |
|   name    | Object |                             Human-translatable-readable name for the event type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event types visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete EventType

To delete existing event type, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event type attributes:

<br/>

|   Name    |  Type  |                                                 Description                                                  |
| :-------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event type.                                |
|   code    | String |                             Unique Human-readable given code of this event type.                             |
|   name    | Object |                             Human-translatable-readable name for the event type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event types visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "code": "SW",
  "name": { "en": "Strong Winds" },
  "color": "#86C7E8"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### List All EventType

To list all event types, send a `GET` request to `https://api.ewea.io/v1/predefines/eventtypes`.

> Example **Request**

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventtypes \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event type with the standard event type attributes:

<br/>

|   Name    |  Type  |                                                 Description                                                  |
| :-------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this event type.                                |
|   code    | String |                             Unique Human-readable given code of this event type.                             |
|   name    | Object |                             Human-translatable-readable name for the event type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate event types visually.                |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95a",
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## EventSeverity

`EventSeverity` The code denoting the severity of the subject event of the alert message

### EventSeverity Schema

`EventSeverity` have the following attributes:

<br />

|    Name     |  Type  |                                                   Description                                                    |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event severity.                                |
| description | String |                         Human-translatable-readable description for the event severity.                          |
|    name     | String |                             Human-translatable-readable name for the event severity.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event severities visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was updated. |

### Create EventSeverity

To create a new event severity, send a `POST` request to `https://api.ewea.io/v1/predefines/eventseverities`. The following attributes are supported:

<br/>

|    Name     |  Type  |                                    Description                                     | Required |
| :---------: | :----: | :--------------------------------------------------------------------------------: | :------: |
| description | Object |          Human-translatable-readable description for the event severity.           |  false   |
|    name     | Object |              Human-translatable-readable name for the event severity.              |   true   |
|    color    | String | A color code(in hexadecimal format) used to differentiate event severity visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventseverities \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Be arer <apiKey>' \
--data '{
    "description": { "en": "Extraordinary threat to life or property" },
    "name": { "en": "Extreme" },
    "color": "#86C7E8"
  }'
```

The response will be a `JSON object` with the standard event severity attributes:

<br/>

|    Name     |  Type  |                                                   Description                                                    |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event severity.                                |
| description | Object |                         Human-translatable-readable description for the event severity.                          |
|    name     | Object |                             Human-translatable-readable name for the event severity.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event severities visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
 "description": { "en": "Extraordinary threat to life or property" },
 "name": { "en": "Extreme" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve EventSeverity

To get a event severity, send a `GET` request to `https://api.ewea.io/v1/predefines/eventseverities/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventseverities/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event severity attributes:

<br/>

|    Name     |  Type  |                                                   Description                                                    |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event severity.                                |
| description | Object |                         Human-translatable-readable description for the event severity.                          |
|    name     | Object |                             Human-translatable-readable name for the event severity.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event severities visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "description": { "en": "Extraordinary threat to life or property" },
  "name": { "en": "Extreme" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update EventSeverity

To update existing event severity, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventseverities/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                           | Required |
| :---------: | :----: | :-------------------------------------------------------------: | :------: |
| description | Object | Human-translatable-readable description for the event severity. |
|    name     | Object |    Human-translatable-readable name for the event severity.     |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventseverities/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "description": { "en": "Extraordinary threat to life or property" },
     "name": { "en": "Extreme" },
  }'
```

The response will be a `JSON object` with the standard event severity attributes:

<br/>

|    Name     |  Type  |                                                   Description                                                    |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event severity.                                |
| description | String |                             Unique Human-readable given code of this event severity.                             |
|    name     | Object |                             Human-translatable-readable name for the event severity.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event severities visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
 "description": { "en": "Extraordinary threat to life or property" },
  "name": { "en": "Extreme" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete EventSeverity

To delete existing event severity, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventseverities/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventseverities/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event severity attributes:

<br/>

|    Name     |  Type  |                                                   Description                                                    |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event severity.                                |
| description | Object |                         Human-translatable-readable description for the event severity.                          |
|    name     | Object |                             Human-translatable-readable name for the event severity.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event severities visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "description": { "en": "Extraordinary threat to life or property" },
  "name": { "en": "Extreme" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### List All EventSeverity

To list all event severities, send a `GET` request to `https://api.ewea.io/v1/predefines/eventseverities`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventseverities \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event severity with the standard event severity attributes:

<br/>

|    Name     |  Type  |                                                   Description                                                    |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event severity.                                |
| description | Object |                         Human-translatable-readable description for the event severity.                          |
|    name     | Object |                             Human-translatable-readable name for the event severity.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event severities visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95b",
     "description": { "en": "Extraordinary threat to life or property" },
     "name": { "en": "Extreme" },
    "color": "#86C7EE"
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## EventCertainty

`EventCertainty` The code denoting the certainty of the subject event of the alert message

### EventCertainty Schema

`EventCertainty` have the following attributes:

<br />

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event certainty.                                |
| description | String |                         Human-translatable-readable description for the event certainty.                          |
|    name     | String |                             Human-translatable-readable name for the event certainty.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event certainties visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was updated. |

### Create EventCertainty

To create a new event certainty, send a `POST` request to `https://api.ewea.io/v1/predefines/eventcertainties`. The following attributes are supported:

<br/>

|    Name     |  Type  |                                     Description                                     | Required |
| :---------: | :----: | :---------------------------------------------------------------------------------: | :------: |
| description | Object |          Human-translatable-readable description for the event certainty.           |  false   |
|    name     | Object |              Human-translatable-readable name for the event certainty.              |   true   |
|    color    | String | A color code(in hexadecimal format) used to differentiate event certainty visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventcertainties \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Be arer <apiKey>' \
--data '{
    "description": { "en": "Determined to have occured or to be ongoing" },
    "name": { "en": "Observed" },
    "color": "#86C7E8"
  }'
```

The response will be a `JSON object` with the standard event certainty attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event certainty.                                |
| description | Object |                         Human-translatable-readable description for the event certainty.                          |
|    name     | Object |                             Human-translatable-readable name for the event certainty.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event certainties visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
 "description": { "en": "Determined to have occured or to be ongoing" },
 "name": { "en": "Observed" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve EventCertainty

To get a event certainty, send a `GET` request to `https://api.ewea.io/v1/predefines/eventcertainties/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventcertainties/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event certainty attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event certainty.                                |
| description | Object |                         Human-translatable-readable description for the event certainty.                          |
|    name     | Object |                             Human-translatable-readable name for the event certainty.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event certainties visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "description": { "en": "Determined to have occured or to be ongoing" },
  "name": { "en": "Observed" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update EventCertainty

To update existing event certainty, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventcertainties/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                            | Required |
| :---------: | :----: | :--------------------------------------------------------------: | :------: |
| description | Object | Human-translatable-readable description for the event certainty. |
|    name     | Object |    Human-translatable-readable name for the event certainty.     |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventcertainties/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "description": { "en": "Determined to have occured or to be ongoing" },
     "name": { "en": "Observed" },
  }'
```

The response will be a `JSON object` with the standard event certainty attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event certainty.                                |
| description | String |                             Unique Human-readable given code of this event certainty.                             |
|    name     | Object |                             Human-translatable-readable name for the event certainty.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event certainties visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
 "description": { "en": "Determined to have occured or to be ongoing" },
  "name": { "en": "Observed" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete EventCertainty

To delete existing event certainty, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventcertainties/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventcertainties/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event certainty attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event certainty.                                |
| description | Object |                         Human-translatable-readable description for the event certainty.                          |
|    name     | Object |                             Human-translatable-readable name for the event certainty.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event certainties visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "description": { "en": "Determined to have occured or to be ongoing" },
  "name": { "en": "Observed" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### List All EventCertainty

To list all event certainties, send a `GET` request to `https://api.ewea.io/v1/predefines/eventcertainties`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventcertainties \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event certainty with the standard event certainty attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event certainty.                                |
| description | Object |                         Human-translatable-readable description for the event certainty.                          |
|    name     | Object |                             Human-translatable-readable name for the event certainty.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate event certainties visually.               |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95b",
     "description": { "en": "Determined to have occured or to be ongoing" },
     "name": { "en": "Observed" },
    "color": "#86C7EE"
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## EventFunction

`EventFunction` groups emergency response actitvities

### EventFunction Schema

`EventFunction` have the following attributes:

<br />

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |

### Create EventFunction

To create a new event function, send a `POST` request to `https://api.ewea.io/v1/predefines/eventfunctions`. The following attributes are supported:

<br/>

|    Name     |  Type  |                                    Description                                     | Required |
| :---------: | :----: | :--------------------------------------------------------------------------------: | :------: |
|    code     | String |              Unique human-readable given code of this event function.              |  false   |
|    name     | Object |              Human-translatable-readable name for the event function.              |   true   |
| description | Object |          Human-translatable-readable description for the event function.           |  false   |
|    color    | String | A color code(in hexadecimal format) used to differentiate event function visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventfunctions \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "code": "DBM",
    "name": { "en": "Dead Bodies Management" },
    "color": "#F9C5A7"
  }'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "name": { "en": "Dead Bodies Management" },
  "abbreviation": { "en": "DBM" },
  "description": { "en": "" },
  "code": "DBM",
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve EventFunction

To get a event frunction, send a `GET` request to `https://api.ewea.io/v1/predefines/eventfunctions/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventfunctions/5ddbbc871283e3131b2d41f4 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event function attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "code": "DBM",
  "name": { "en": "Dead Bodies Management" },
  "description": { "en": "" },
  "abbreviation": { "en": "DBM" },
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update EventFunction

To update existing event function, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventfunctions/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                           | Required |
| :---------: | :----: | :-------------------------------------------------------------: | :------: |
|    name     | Object |    Human-translatable-readable name for the event function.     |   true   |
| description | Object | Human-translatable-readable description for the event function. |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventfunctions/5ddbbc871283e3131b2d41f4 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "name": { "en": "Dead Bodies Management" },
    "description": { "en": "" },
  }'
```

The response will be a `JSON object` with the standard event function attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "code": "DBM",
  "name": { "en": "Dead Bodies Management" },
  "abbreviation": { "en": "DBM" },
  "description": { "en": "" },
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Delete EventFunction

To delete existing event group, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventfunctions/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventfunctions/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event function attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "code": "DBM",
  "name": { "en": "Dead Bodies Management" },
  "abbreviation": { "en": "DBM" },
  "description": { "en": "" },
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### List All EventFuntion

To list all event functions, send a `GET` request to `https://api.ewea.io/v1/predefines/`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventfunctions \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of eventfunction with the standard event function attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
  "_id": "5ddbbc871283e3131b2d41f4",
  "name": { "en": "Dead Bodies Management" },
  "abbreviation": { "en": "DBM" },
  "description": { "en": "" },
  "code": "DBM",
  "color": "#F9C5A7"
  "updatedAt": "2019-11-25T12:48:43.342Z",
  "createdAt": "2019-11-25T11:35:35.519Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-11-25T12:48:43.342Z"
}
```

## EventAction

> TODO

## EventCatalogue

> TODO

## Event

> TODO

## EventNotification

> TODO

## EventChangeLog

> TODO

## AdministrativeLevel

`AdministrativeLevel` Subdivisions of areas/territories/jurisdictions recognized by governments or other organizations for administrative purposes.

### AdministrativeLevel Schema

`AdministrativeLevel` have the following attributes:

<br />

|    Name     |  Type  |                                                      Description                                                       |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this administrative level.                                |
|    name     | Object |                             Human-translatable-readable name for the administrative level.                             |
| description | Object |                         Human-translatable-readable description for the administrative level.                          |
|    color    | String |               A color code(in hexadecimal format) used to differentiate administrative levels visually.                |
|    level    | Number |                                                 Administrative level.                                                  |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was updated. |

### Create AdministrativeLevel

To create a new adminstrative level, send a `POST` request to `https://api.ewea.io/v1/predefines/administrativelevels`. The following attributes are supported:

<br/>

|    Name     |             Type             |                                       Description                                        | Required |
| :---------: | :--------------------------: | :--------------------------------------------------------------------------------------: | :------: |
|    name     |            Object            |              Human-translatable-readable name for the administrative level.              |   true   |
| description |            Object            |          Human-translatable-readable description for the administrative level.           |  false   |
|    color    |            String            | A color code(in hexadecimal format) used to differentiate administrative level visually. |  false   |
|    level    | Number Administrative level. |                                           true                                           |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/administrativelevels \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "name": { "en": "City" },
    "description": { "en": "The name of the metropolitan area itself" },
    "level": 1
    "color": "#F9C5A7"
  }'
```

The response will be a `JSON object` with the standard administrative level attributes:

<br/>

|    Name     |  Type  |                                                      Description                                                       |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this administrative level.                                |
|    name     | Object |                             Human-translatable-readable name for the administrative level.                             |
| description | Object |                         Human-translatable-readable description for the administrative level.                          |
|    color    | String |               A color code(in hexadecimal format) used to differentiate administrative levels visually.                |
|    level    | Number |                                                 Administrative level.                                                  |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5dabbc871283e3131b2d41f2",
  "name": { "en": "City" },
  "description": { "en": "The name of the metropolitan area itself" },
  "level": 1
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve AdministrativeLevel

To get a administrative level, send a `GET` request to `https://api.ewea.io/v1/predefines/administrativelevels/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/administrativelevels/5dabbc871283e3131b2d41f2 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard administrative level attributes:

<br/>

|    Name     |  Type  |                                                      Description                                                       |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this administrative level.                                |
|    name     | Object |                             Human-translatable-readable name for the administrative level.                             |
| description | Object |                         Human-translatable-readable description for the administrative level.                          |
|    color    | String |               A color code(in hexadecimal format) used to differentiate administrative levels visually.                |
|    level    | Number |                                                 Administrative level.                                                  |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dabbc871283e3131b2d41f2",
  "name": { "en": "City" },
  "description": { "en": "The name of the metropolitan area itself" },
  "level": 1
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update AdministrativeLevel

To update existing administrative level, send a `PATCH` request to `https://api.ewea.io/v1/predefines/administrativelevels/:id`. The following attributes are supported:

<br/>

|            Name             |  Type  |                              Description                              | Required |
| :-------------------------: | :----: | :-------------------------------------------------------------------: | :------: |
|            name             | Object |    Human-translatable-readable name for the administrative level.     |   true   |
|         description         | Object | Human-translatable-readable description for the administrative level. |  false   |
| level Administrative level. |  true  |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/administrativelevels/5dabbc871283e3131b2d41f2 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "name": { "en": "City" },
  "description": { "en": "" },
  "level": 0
  }'
```

The response will be a `JSON object` with the standard administrative level attributes:

<br/>

|    Name     |  Type  |                                                      Description                                                       |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this administrative level.                                |
|    name     | Object |                             Human-translatable-readable name for the administrative level.                             |
| description | Object |                         Human-translatable-readable description for the administrative level.                          |
|    color    | String |               A color code(in hexadecimal format) used to differentiate administrative levels visually.                |
|    level    | Number |                                                 Administrative level.                                                  |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dabbc871283e3131b2d41f2",
  "name": { "en": "City" },
  "description": { "en": "The name of the metropolitan area itself" },
  "level": 0
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Delete AdministrativeLevel

To delete existing administrative level, send a `DELETE` request to `https://api.ewea.io/v1/predefines/administrativelevels/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/administrativelevels/5dabbc871283e3131b2d41f2 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard administrative level attributes:

<br/>

|    Name     |  Type  |                                                      Description                                                       |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this administrative level.                                |
|    name     | Object |                             Human-translatable-readable name for the administrative level.                             |
| description | Object |                         Human-translatable-readable description for the administrative level.                          |
|    color    | String |               A color code(in hexadecimal format) used to differentiate administrative levels visually.                |
|    level    | Number |                                                 Administrative level.                                                  |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dabbc871283e3131b2d41f2",
  "name": { "en": "City" },
  "description": { "en": "" },
  "level": 1
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### List All AdministrativeLevel

To list all administrative level, send a `GET` request to `https://api.ewea.io/v1/predefines/`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/administrativelevels \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of administrativelevels with the standard administrative level attributes:

<br/>

|    Name     |  Type  |                                                      Description                                                       |
| :---------: | :----: | :--------------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this administrative level.                                |
|    name     | Object |                             Human-translatable-readable name for the administrative level.                             |
| description | Object |                         Human-translatable-readable description for the administrative level.                          |
|    color    | String |               A color code(in hexadecimal format) used to differentiate administrative levels visually.                |
|    level    | Number |                                                 Administrative level.                                                  |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
  "_id": "5dabbc871283e3131b2d41f2",
  "name": { "en": "City" },
  "description": { "en": "The name of the metropolitan area itself" },
  "level": 1
  "color": "#F9C5A7"
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
  }],
  "total": 26,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 3,
  "lastModified": "2019-11-25T12:48:43.342Z"
}
```

## AdministrativeArea

> TODO

## FeatureType

> TODO

## Feature

> TODO

# Acknowledgements

© 2019, EWEA. Released under the <a href="https://github.com/CodeTanzania/ewea/blob/develop/LICENSE" target="_blank">MIT License</a>.
