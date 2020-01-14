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
| username | String |     Registered `email` or `phone number`      |   true   |
| password | String | Registered passkey used authenticate a party. |   true   |

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
    "_id": "5ddfadfd8fadd0276378b0d6",
    "type": "Focal Person",
    "name": "John Doe",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
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

|                    Name                    |  Type  |                                             Description                                             |
| :----------------------------------------: | :----: | :-------------------------------------------------------------------------------------------------: |
|                    \_id                    | String |                             Unique universal identifier of this party.                              |
|                   party                    | String |  Top party(i.e company, organization etc) under which a party is derived(or member, part of etc).   |
|                    type                    | String |                                   Human readable type of a party.                                   |
|    [group](#core-resources-partygroup)     | String |                                  Human readable group of a party.                                   |
|                    name                    | Object |                                   Human readable name of a party.                                   |
|                abbreviation                | String |                             Human readable short form of a party name.                              |
|                   locale                   | String |              Defines the party's language, region and any special variant preferences.              |
|                   email                    | String |                           Primary email address used to contact a party.                            |
|                   mobile                   | String |                        Primary mobile phone number used to contact a party.                         |
|                  landline                  | String |               Primary main-line(or fixed-line) phone number used to contact a party.                |
|                    fax                     | String |                             Primary fax number used to contact a party.                             |
|                  website                   | String |                              Primary website url(or link) of a party.                               |
|              physicalAddress               | String |                              Primary physical address of party office.                              |
|               postalAddress                | String |                               Primary postal address of party office.                               |
|                   centre                   | Object |               A geo-location coordinates of a party main office or area of operation.               |
| [area](#core-resources-administrativearea) | String |                 Geographical location of a party main office or area of operation.                  |
|     [role](#core-resources-partyrole)      | String |                                Assignable or given role to a party.                                 |
|                 createdAt                  | String | A time value given in ISO8601 combined date and time format that represents when party was created. |
|                 updatedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party was updated. |

### Create Party

To create a new event group, send a `POST` request to `https://api.ewea.io/v1/parties`. The following attributes are supported:

<br />

|                    Name                    |  Type  |                                           Description                                            | Required |
| :----------------------------------------: | :----: | :----------------------------------------------------------------------------------------------: | :------: |
|                   party                    | String | Top party(i.e company, organization etc) under which a party is derived(or member, part of etc). |  false   |
|                    type                    | String |                                 Human readable type of a party.                                  |  false   |
|    [group](#core-resources-partygroup)     | String |                                 Human readable group of a party.                                 |  false   |
|                    name                    | Object |                                 Human readable name of a party.                                  |   true   |
|                abbreviation                | String |                            Human readable short form of a party name.                            |  false   |
|                   locale                   | String |            Defines the party's language, region and any special variant preferences.             |  false   |
|                   email                    | String |                          Primary email address used to contact a party.                          |   true   |
|                   mobile                   | String |                       Primary mobile phone number used to contact a party.                       |   true   |
|                  landline                  | String |              Primary main-line(or fixed-line) phone number used to contact a party.              |  false   |
|                    fax                     | String |                           Primary fax number used to contact a party.                            |  false   |
|                  website                   | String |                             Primary website url(or link) of a party.                             |  false   |
|              physicalAddress               | String |                            Primary physical address of party office.                             |  false   |
|               postalAddress                | String |                             Primary postal address of party office.                              |  false   |
|                   centre                   | Object |             A geo-location coordinates of a party main office or area of operation.              |  false   |
| [area](#core-resources-administrativearea) | String |                Geographical location of a party main office or area of operation.                |  false   |
|     [role](#core-resources-partyrole)      | String |                               Assignable or given role to a party.                               |  false   |

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

|                    Name                    |  Type  |                                                Description                                                 |
| :----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|                    \_id                    | String |                                 Unique universal identifier of this party.                                 |
|                    type                    | String |                                      Human readable type of a party.                                       |
|                    name                    | Object |                                      Human readable name of a party.                                       |
|    [group](#core-resources-partygroup)     | String |                                      Human readable group of a party.                                      |
|                abbreviation                | String |                                 Human readable short form of a party name.                                 |
|                   locale                   | String |                 Defines the party's language, region and any special variant preferences.                  |
|                   email                    | String |                               Primary email address used to contact a party.                               |
|                   mobile                   | String |                            Primary mobile phone number used to contact a party.                            |
|                  landline                  | String |                   Primary main-line(or fixed-line) phone number used to contact a party.                   |
|                    fax                     | String |                                Primary fax number used to contact a party.                                 |
|                  website                   | String |                                  Primary website url(or link) of a party.                                  |
|              physicalAddress               | String |                                 Primary physical address of party office.                                  |
|               postalAddress                | String |                                  Primary postal address of party office.                                   |
|                   centre                   | Object |                  A geo-location coordinates of a party main office or area of operation.                   |
| [area](#core-resources-administrativearea) | String |                     Geographical location of a party main office or area of operation.                     |
|     [role](#core-resources-partyrole)      | String |                                    Assignable or given role to a party.                                    |
|                 createdAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|                 updatedAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|                  lockedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response

```curl
HTTP/1.1 201 Success
{
    "_id": "5ddfadfd8fadd0276378b0d6",
    "type": "Focal Person",
    "name": "John Doe",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
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

|                    Name                    |  Type  |                                                Description                                                 |
| :----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|                    \_id                    | String |                                 Unique universal identifier of this party.                                 |
|                    name                    | Object |                                      Human readable name of a party.                                       |
|                    type                    | String |                                      Human readable type of a party.                                       |
|    [group](#core-resources-partygroup)     | String |                                      Human readable group of a party.                                      |
|                abbreviation                | String |                                 Human readable short form of a party name.                                 |
|                   locale                   | String |                 Defines the party's language, region and any special variant preferences.                  |
|                   email                    | String |                               Primary email address used to contact a party.                               |
|                   mobile                   | String |                            Primary mobile phone number used to contact a party.                            |
|                  landline                  | String |                   Primary main-line(or fixed-line) phone number used to contact a party.                   |
|                    fax                     | String |                                Primary fax number used to contact a party.                                 |
|                  website                   | String |                                  Primary website url(or link) of a party.                                  |
|              physicalAddress               | String |                                 Primary physical address of party office.                                  |
|               postalAddress                | String |                                  Primary postal address of party office.                                   |
|                   centre                   | Object |                  A geo-location coordinates of a party main office or area of operation.                   |
| [area](#core-resources-administrativearea) | String |                     Geographical location of a party main office or area of operation.                     |
|     [role](#core-resources-partyrole)      | String |                                    Assignable or given role to a party.                                    |
|                 createdAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|                 updatedAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|                  lockedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddfadfd8fadd0276378b0d6",
  "type": "Focal Person",
  "name": "John Doe",
  "abbreviation": "JD",
  "locale": "en",
  "email": "john.doe@example.com",
  "mobile": "255789321212",
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

|                    Name                    |  Type  |                                                Description                                                 |
| :----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|                    \_id                    | String |                                 Unique universal identifier of this party.                                 |
|                    name                    | Object |                                      Human readable name of a party.                                       |
|                    type                    | String |                                      Human readable type of a party.                                       |
|    [group](#core-resources-partygroup)     | String |                                      Human readable group of a party.                                      |
|                abbreviation                | String |                                 Human readable short form of a party name.                                 |
|                   locale                   | String |                 Defines the party's language, region and any special variant preferences.                  |
|                   email                    | String |                               Primary email address used to contact a party.                               |
|                   mobile                   | String |                            Primary mobile phone number used to contact a party.                            |
|                  landline                  | String |                   Primary main-line(or fixed-line) phone number used to contact a party.                   |
|                    fax                     | String |                                Primary fax number used to contact a party.                                 |
|                  website                   | String |                                  Primary website url(or link) of a party.                                  |
|              physicalAddress               | String |                                 Primary physical address of party office.                                  |
|               postalAddress                | String |                                  Primary postal address of party office.                                   |
|                   centre                   | Object |                  A geo-location coordinates of a party main office or area of operation.                   |
| [area](#core-resources-administrativearea) | String |                     Geographical location of a party main office or area of operation.                     |
|     [role](#core-resources-partyrole)      | String |                                    Assignable or given role to a party.                                    |
|                 createdAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|                 updatedAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|                  lockedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddfadfd8fadd0276378b0d6",
  "type": "Focal Person",
  "name": "John Dae",
  "abbreviation": "JD",
  "locale": "en",
  "email": "john.doe@example.com",
  "mobile": "255789321212",
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

|                    Name                    |  Type  |                                                 Description                                                 |
| :----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                    | String |                                 Unique universal identifier of this party.                                  |
|                    name                    | Object |                                       Human readable name of a party.                                       |
|                    type                    | String |                                       Human readable type of a party.                                       |
|    [group](#core-resources-partygroup)     | String |                                      Human readable group of a party.                                       |
|                abbreviation                | String |                                 Human readable short form of a party name.                                  |
|                   locale                   | String |                  Defines the party's language, region and any special variant preferences.                  |
|                   email                    | String |                               Primary email address used to contact a party.                                |
|                   mobile                   | String |                            Primary mobile phone number used to contact a party.                             |
|                  landline                  | String |                   Primary main-line(or fixed-line) phone number used to contact a party.                    |
|                    fax                     | String |                                 Primary fax number used to contact a party.                                 |
|                  website                   | String |                                  Primary website url(or link) of a party.                                   |
|              physicalAddress               | String |                                  Primary physical address of party office.                                  |
|               postalAddress                | String |                                   Primary postal address of party office.                                   |
|                   centre                   | Object |                   A geo-location coordinates of a party main office or area of operation.                   |
| [area](#core-resources-administrativearea) | String |                     Geographical location of a party main office or area of operation.                      |
|     [role](#core-resources-partyrole)      | String |                                    Assignable or given role to a party.                                     |
|                 createdAt                  | String |     A time value given in ISO8601 combined date and time format that represents when party was created.     |
|                 updatedAt                  | String |     A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|                  lockedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party account was locked.  |
|                 deletedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party account was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
    "_id": "5ddfadfd8fadd0276378b0d6",
    "type": "Focal Person",
    "name": "John Dae",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
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

|                    Name                    |  Type  |                                                Description                                                 |
| :----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------: |
|                    \_id                    | String |                                 Unique universal identifier of this party.                                 |
|                    name                    | Object |                                      Human readable name of a party.                                       |
|                    type                    | String |                                      Human readable type of a party.                                       |
|    [group](#core-resources-partygroup)     | String |                                      Human readable group of a party.                                      |
|                abbreviation                | String |                                 Human readable short form of a party name.                                 |
|                   locale                   | String |                 Defines the party's language, region and any special variant preferences.                  |
|                   email                    | String |                               Primary email address used to contact a party.                               |
|                   mobile                   | String |                            Primary mobile phone number used to contact a party.                            |
|                  landline                  | String |                   Primary main-line(or fixed-line) phone number used to contact a party.                   |
|                    fax                     | String |                                Primary fax number used to contact a party.                                 |
|                  website                   | String |                                  Primary website url(or link) of a party.                                  |
|              physicalAddress               | String |                                 Primary physical address of party office.                                  |
|               postalAddress                | String |                                  Primary postal address of party office.                                   |
|                   centre                   | Object |                  A geo-location coordinates of a party main office or area of operation.                   |
| [area](#core-resources-administrativearea) | String |                     Geographical location of a party main office or area of operation.                     |
|     [role](#core-resources-partyrole)      | String |                                    Assignable or given role to a party.                                    |
|                 createdAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was created.     |
|                 updatedAt                  | String |    A time value given in ISO8601 combined date and time format that represents when party was updated.     |
|                  lockedAt                  | String | A time value given in ISO8601 combined date and time format that represents when party account was locked. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5ddfadfd8fadd0276378b0d6",
    "type": "Focal Person",
    "name": "John Dae",
    "abbreviation": "JD",
    "locale": "en",
    "email": "john.doe@example.com",
    "mobile": "255789321212",
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

`PartyRole` role of parties based on roles defined in emergency plan

### PartyRole Schema

`PartyRole` have the following attributes:

<br />

|    Name     |  Type  |                                                 Description                                                  |
| :---------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party role.                                |
| description | Object |                         Human-translatable-readable description for the party role.                          |
|    name     | Object |                             Human-translatable-readable name for the party role.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party roles visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was updated. |

### Create PartyRole

To create a new party role, send a `POST` request to `https://api.ewea.io/v1/predefines/partyroles`. The following attributes are supported:

<br/>

|    Name     |  Type  |                                  Description                                   | Required |
| :---------: | :----: | :----------------------------------------------------------------------------: | :------: |
| description | Object |          Human-translatable-readable description for the party role.           |  false   |
|    name     | Object |              Human-translatable-readable name for the party role.              |   true   |
|    color    | String | A color code(in hexadecimal format) used to differentiate party role visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/partyroles \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": {
      "name": { "en": "ICT officer" },
      "description": { "en": "ICT officer" },
      "color": "#86C7E8"
    }
  }'
```

The response will be a `JSON object` with the standard party role attributes:

<br/>

|    Name     |  Type  |                                                 Description                                                  |
| :---------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party role.                                |
| description | Object |                         Human-translatable-readable description for the party role.                          |
|    name     | Object |                             Human-translatable-readable name for the party role.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party roles visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings": {
    "name": { "en": "ICT officer" }
    "description": { "en": "ICT officer" },
    "color": "#86C7EE"
  },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve PartyRole

To get a party role, send a `GET` request to `https://api.ewea.io/v1/predefines/partyroles/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/partyroles/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party role attributes:

<br/>

|    Name     |  Type  |                                                 Description                                                  |
| :---------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party role.                                |
| description | Object |                         Human-translatable-readable description for the party role.                          |
|    name     | Object |                             Human-translatable-readable name for the party role.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party roles visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings": {
    "description": { "en": "ICT officer" },
    "name": { "en": "ICT officer" },
    "color": "#86C7EE"
  },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update PartyRole

To update existing party role, send a `PATCH` request to `https://api.ewea.io/v1/predefines/partyroles/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                         Description                         | Required |
| :---------: | :----: | :---------------------------------------------------------: | :------: |
| description | Object | Human-translatable-readable description for the party role. |
|    name     | Object |    Human-translatable-readable name for the party role.     |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/partyroles/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "strings": {
      "name": { "en": "ICT officer" },
      "description": { "en": "ICT officer" }
    }
  }'
```

The response will be a `JSON object` with the standard party role attributes:

<br/>

|    Name     |  Type  |                                                 Description                                                  |
| :---------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party role.                                |
| description | String |                             Unique Human-readable given code of this party role.                             |
|    name     | Object |                             Human-translatable-readable name for the party role.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party roles visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings":{
    "name": { "en": "ICT officer" },
    "description": { "en": "ICT officer" },
    "color": "#86C7EE"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete PartyRole

To delete existing party role, send a `DELETE` request to `https://api.ewea.io/v1/predefines/partyroles/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/partyroles/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party role attributes:

<br/>

|    Name     |  Type  |                                                 Description                                                  |
| :---------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party role.                                |
| description | Object |                         Human-translatable-readable description for the party role.                          |
|    name     | Object |                             Human-translatable-readable name for the party role.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party roles visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was updated. |
|  deletedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings":{
    "name": { "en": "ICT officer" },
    "description": { "en": "ICT officer" },
    "color": "#86C7EE"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
  "createdAt": "2019-02-21T15:30:04.340Z"
}
```

### List All PartyRole

To list all party roles, send a `GET` request to `https://api.ewea.io/v1/predefines/partyroles`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/partyroles \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of party role with the standard party role attributes:

<br/>

|    Name     |  Type  |                                                 Description                                                  |
| :---------: | :----: | :----------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this party role.                                |
| description | Object |                         Human-translatable-readable description for the party role.                          |
|    name     | Object |                             Human-translatable-readable name for the party role.                             |
|    color    | String |               A color code(in hexadecimal format) used to differentiate party roles visually.                |
|  createdAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was created. |
|  updatedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party role was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95b",
    "strings":{
     "name": { "en": "ICT officer" },
     "description": { "en": "ICT officer" },
     "color": "#86C7EE"
    },
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
  "strings": {
      "name": { "en": "Government Agencies" },
      "description": { "en": "Group of Agencies belonging to the government" },
      "color": "#86C7E8"
    }
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
  "strings":{
    "description": { "en": "Group of Agencies belonging to the government" },
    "name": { "en": "Government Agencies" },
    "color": "#86C7EE"
  },
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
  "strings": {
    "name": { "en": "Government Agencies" },
    "description": { "en": "Group of Agencies belonging to the government" },
    "color": "#86C7EE"
  },
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
  "strings": {
      "name": { "en": "Government Agencies" }
      "description": { "en": "Group of Agencies belonging to the government" },
    }
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
  "strings":{
    "name": { "en": "Government Agencies" }
    "description": { "en": "Group of Agencies belonging to the government" },
  },
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
|  deletedAt  | String | A time value given in ISO8601 combined date and time format that represents when the party group was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings":{
    "name": { "en": "Government Agencies" }
    "description": { "en": "Group of Agencies belonging to the government" },
  },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z",
  "deletedAt": "2019-02-21T15:30:04.340Z"
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
    "strings":{
     "name": { "en": "Government Agencies" }
     "description": { "en": "Group of Agencies belonging to the government" },
    }
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
  "strings": {
      "name": { "en": "Hydrological" },
      "code": "H",
      "color": "#86C7E8"
    }
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
  "strings": {
    "code": "H",
    "name": { "en": "Hydrological" },
    "color": "#86C7EE"
  },
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
  "strings": {
    "name": { "en": "Hydrological" },
    "code": "H",
    "color": "#86C7EE"
  },
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
    "strings": {
      "name": { "en": "Hydrological" },
    }
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
  "strings": {
    "code": "H",
    "name": { "en": "Hydrological" },
    "color": "#86C7EE"
  },
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
| deletedAt | String | A time value given in ISO8601 combined date and time format that represents when the event group was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "code": "H",
  "name": { "en": "Hydrological" },
  "color": "#86C7EE"
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z",
  "deletedAt": "2019-02-21T15:30:04.340Z"
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
  "strings": {
      "code": "SW",
      "name": { "en": "Strong Winds" },
      "color": "#86C7E8"
    }
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
  "strings": {
    "name": { "en": "Strong Winds" },
    "code": "SW",
    "color": "#86C7E8"
  },
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
  "strings": {
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Update EventType

To update existing event type, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventtypes/:id`. The following attributes are supported:

<br/>

| Name |  Type  |                     Description                      |
| :--: | :----: | :--------------------------------------------------: |
| name | Object | Human-translatable-readable name for the event type. |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventtypes/5c6ea7dae1dc700018aac95a \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": { "name": { "en": "Strong Winds" }}
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
  "strings": {
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
  },
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
| deletedAt | String | A time value given in ISO8601 combined date and time format that represents when the event type was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95a",
  "strings":{
    "code": "SW",
    "name": { "en": "Strong Winds" },
    "color": "#86C7E8"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z",
  "deletedAt": "2019-02-21T15:30:04.340Z"
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
    "strings": {
      "code": "SW",
      "name": { "en": "Strong Winds" },
      "color": "#86C7E8"
    },
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
    "strings": {
      "name": { "en": "Extreme" },
      "description": { "en": "Extraordinary threat to life or property" },
      "color": "#86C7E8"
    }
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
  "strings": {
    "name": { "en": "Extreme" },
    "description": { "en": "Extraordinary threat to life or property" },
    "color": "#86C7EE"
  },
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
  "strings": {
    "description": { "en": "Extraordinary threat to life or property" },
    "name": { "en": "Extreme" },
    "color": "#86C7EE"
  },
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
    "strings": {
      "description": { "en": "Extraordinary threat to life or property" },
      "name": { "en": "Extreme" }
    }
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
  "strings": {
    "name": { "en": "Extreme" },
    "description": { "en": "Extraordinary threat to life or property" },
    "color": "#86C7EE"
  },
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
|  deletedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event severity was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings": {
    "name": { "en": "Extreme" },
    "description": { "en": "Extraordinary threat to life or property" },
    "color": "#86C7EE"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
  "deletedAt": "2019-02-21T14:30:04.340Z"
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
    "strings": {
      "name": { "en": "Extreme" },
      "description": { "en": "Extraordinary threat to life or property" },
      "color": "#86C7EE"
    },
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
  "strings": {
    "name": { "en": "Observed" },
    "description": { "en": "Determined to have occured or to be ongoing" },
    "color": "#86C7E8"
  }
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
  "strings": {
    "description": { "en": "Determined to have occured or to be ongoing" },
    "name": { "en": "Observed" },
    "color": "#86C7EE"
  },
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
  "strings": {
    "description": { "en": "Determined to have occured or to be ongoing" },
    "name": { "en": "Observed" },
  }
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
  "strings": {
    "name": { "en": "Observed" },
    "description": { "en": "Determined to have occured or to be ongoing" },
    "color": "#86C7EE"
  }
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
|  deletedAt  | String | A time value given in ISO8601 combined date and time format that represents when the event certainty was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5c6ea7dae1dc700018aac95b",
  "strings": {
    "name": { "en": "Observed" },
    "description": { "en": "Determined to have occured or to be ongoing" },
    "color": "#86C7EE"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z",
  "deletedAt": "2019-02-21T14:30:04.340Z"
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
    "strings": {
      "name": { "en": "Observed" },
      "description": { "en": "Determined to have occured or to be ongoing" },
      "color": "#86C7EE"
    },
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

`EventFunction` groups emergency response activities

### EventFunction Schema

`EventFunction` have the following attributes:

<br />

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     type     | String |                                     Human readable type of a event function.                                     |
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
|    type     | String |                      Human readable type of a event function.                      |   true   |
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
    "type": "Flood"
    "strings": {
      "code": "DBM",
      "name": { "en": "Dead Bodies Management" },
      "color": "#F9C5A7"
    }
  }'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     type     | String |                                     Human readable type of a event function.                                     |
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
  "type": "Flood",
  "strings": {
    "name": { "en": "Dead Bodies Management" },
    "abbreviation": { "en": "DBM" },
    "description": { "en": "" },
    "code": "DBM",
    "color": "#F9C5A7"
  },
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
|     type     | String |                                     Human readable type of a event function.                                     |
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
  "type": "Flood",
  "strings": {
    "code": "DBM",
    "name": { "en": "Dead Bodies Management" },
    "description": { "en": "" },
    "abbreviation": { "en": "DBM" },
    "color": "#F9C5A7"
  },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update EventFunction

To update existing event function, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventfunctions/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                           | Required |
| :---------: | :----: | :-------------------------------------------------------------: | :------: |
|    type     | String |            Human readable type of a event function.             |   true   |
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
    "type": "Flood",
    "strings": {
      "name": { "en": "Dead Bodies Management" },
      "description": { "en": "" }
    }
  }'
```

The response will be a `JSON object` with the standard event function attributes:

<br/>

|     Name     |  Type  |                                                   Description                                                    |
| :----------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this event function.                                |
|     type     | String |                                     Human readable type of a event function.                                     |
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
  "type": "Flood",
  "strings": {
    "code": "DBM",
    "name": { "en": "Dead Bodies Management" },
    "abbreviation": { "en": "DBM" },
    "description": { "en": "" },
    "color": "#F9C5A7"
  },
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
|     type     | String |                                     Human readable type of a event function.                                     |
|     name     | Object |                             Human-translatable-readable name for the event function.                             |
| abbreviation | Object |                   Human-translatable-readable abbreviation for the name of the event function.                   |
| description  | Object |                         Human-translatable-readable description for the event function.                          |
|     code     | String |                             Unique human-readable given code of this event function.                             |
|    color     | String |               A color code(in hexadecimal format) used to differentiate event functions visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was updated. |
|  deletedAt   | String | A time value given in ISO8601 combined date and time format that represents when the event function was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "type": "Flood",
  "strings": {
    "code": "DBM",
    "name": { "en": "Dead Bodies Management" },
    "abbreviation": { "en": "DBM" },
    "description": { "en": "" },
    "color": "#F9C5A7"
  },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z",
  "deletedAt": "2019-02-21T14:45:04.340Z"
}
```

### List All EventFunction

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
|     type     | String |                                     Human readable type of a event function.                                     |
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
  "type": "Flood",
  "strings": {
    "name": { "en": "Dead Bodies Management" },
    "abbreviation": { "en": "DBM" },
    "description": { "en": "" },
    "code": "DBM",
    "color": "#F9C5A7"
  },
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

`EventAction` defines an emergency response activity

### EventAction Schema

`EventAction` have the following attributes:

<br />

|                   Name                    |  Type  |                                                  Description                                                   |
| :---------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|                   \_id                    | String |                               Unique universal identifier of this event action.                                |
|                   name                    | Object |                             Human-translatable-readable name for the event action.                             |
|     [type](#core-resources-eventtype)     | String |                 Human readable type of a event that the action can be triggered to take place.                 |
|               abbreviation                | Object |                   Human-translatable-readable abbreviation for the name of the event action.                   |
|                description                | Object |                         Human-translatable-readable description for the event action.                          |
|                   code                    | String |                             Unique human-readable given code of this event action.                             |
|                   color                   | String |               A color code(in hexadecimal format) used to differentiate event actions visually.                |
| [function](#core-resources-eventfunction) | String |          Human-translatable-readable name of event function to which the action is categorized into.           |
|                 createdAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was created. |
|                 updatedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was updated. |

### Create EventAction

To create a new event action, send a `POST` request to `https://api.ewea.io/v1/predefines/eventactions`. The following attributes are supported:

<br/>

|                   Name                    |  Type  |                                         Description                                         | Required |
| :---------------------------------------: | :----: | :-----------------------------------------------------------------------------------------: | :------: |
|                   code                    | String |                   Unique human-readable given code of this event action.                    |  false   |
|     [type](#core-resources-eventtype)     | String |       Human readable type of a event that the action can be triggered to take place.        |   true   |
|                   name                    | Object |                   Human-translatable-readable name for the event action.                    |   true   |
|                description                | Object |                Human-translatable-readable description for the event action.                |  false   |
|                   color                   | String |      A color code(in hexadecimal format) used to differentiate event action visually.       |  false   |
| [function](#core-resources-eventfunction) | String | Human-translatable-readable name of event function to which the action is categorized into. |   true   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventactions \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": {
    "name": { "en": "Disseminating warning information to the public" }
  },
  "function": "Direction and Control"
}'
```

The response will be a `JSON object` with the standard event group attributes:

<br/>

|                   Name                    |  Type  |                                                  Description                                                   |
| :---------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|                   \_id                    | String |                               Unique universal identifier of this event action.                                |
|                   name                    | Object |                             Human-translatable-readable name for the event action.                             |
|     [type](#core-resources-eventtype)     | String |                 Human readable type of a event that the action can be triggered to take place.                 |
|               abbreviation                | Object |                   Human-translatable-readable abbreviation for the name of the event action.                   |
|                description                | Object |                         Human-translatable-readable description for the event action.                          |
|                   code                    | String |                             Unique human-readable given code of this event action.                             |
|                   color                   | String |               A color code(in hexadecimal format) used to differentiate event actions visually.                |
| [function](#core-resources-eventfunction) | String |           Human-translatable-readable name of event function to which the action is categorized into           |
|                 createdAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was created. |
|                 updatedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"strings": {
  "name": { "en": "Disseminating warning information to the public" },
  "abbreviation": { "en": "DWITTP" },
  "description": { "en": "Disseminating warning information to the public" },
  "code": "DWITTP",
  "color": "#F4EF8D",
},
"function": {
    "_id": "5ddbbc871283e3131b2d41dc",
    "name": { "en": "Direction and Control" },
  },
"updatedAt": "2019-12-04T13:42:46.937Z",
"createdAt": "2019-12-04T13:42:20.186Z"
}
```

### Retrieve EventAction

To get an event action, send a `GET` request to `https://api.ewea.io/v1/predefines/eventactions/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventactions/5de7b7bb9a6ed7342b200f02 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event action attributes:

<br/>

|                   Name                    |  Type  |                                                  Description                                                   |
| :---------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|                   \_id                    | String |                               Unique universal identifier of this event action.                                |
|                   name                    | Object |                             Human-translatable-readable name for the event action.                             |
|     [type](#core-resources-eventtype)     | String |                 Human readable type of a event that the action can be triggered to take place.                 |
|               abbreviation                | Object |                   Human-translatable-readable abbreviation for the name of the event action.                   |
|                description                | Object |                         Human-translatable-readable description for the event action.                          |
|                   code                    | String |                             Unique human-readable given code of this event action.                             |
|                   color                   | String |               A color code(in hexadecimal format) used to differentiate event actions visually.                |
| [function](#core-resources-eventfunction) | String |           Human-translatable-readable name of event function to which the action is categorized into           |
|                 createdAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was created. |
|                 updatedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"strings": {
  "name": { "en": "Disseminating warning information to the public" },
  "abbreviation": { "en": "DWITTP" },
  "description": { "en": "Disseminating warning information to the public" },
  "code": "DWITTP",
  "color": "#F4EF8D"
},
"function": {
    "_id": "5ddbbc871283e3131b2d41dc",
    "name": { "en": "Direction and Control" },
  },
"updatedAt": "2019-12-04T13:42:46.937Z",
"createdAt": "2019-12-04T13:42:20.186Z"
}
```

### Update EventAction

To update existing event action, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventactions/:id`. The following attributes are supported:

<br/>

|                   Name                    |  Type  |                                         Description                                         | Required |
| :---------------------------------------: | :----: | :-----------------------------------------------------------------------------------------: | :------: |
|     [type](#core-resources-eventtype)     | String |       Human readable type of a event that the action can be triggered to take place.        |   true   |
|                   name                    | Object |                   Human-translatable-readable name for the event action.                    |   true   |
|                description                | Object |                Human-translatable-readable description for the event action.                |  false   |
| [function](#core-resources-eventfunction) | String | Human-translatable-readable name of event function to which the action is categorized into. |   true   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventactions/5de7b7bb9a6ed7342b200f02 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings":{
    "name": { "en": "Disseminating warning information to the public" }
  },
  "function":  { "en": "Direction and Control" }
}'
```

The response will be a `JSON object` with the standard event action attributes:

<br/>

|                   Name                    |  Type  |                                                  Description                                                   |
| :---------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|                   \_id                    | String |                               Unique universal identifier of this event action.                                |
|                   name                    | Object |                             Human-translatable-readable name for the event action.                             |
|     [type](#core-resources-eventtype)     | String |                 Human readable type of a event that the action can be triggered to take place.                 |
|               abbreviation                | Object |                   Human-translatable-readable abbreviation for the name of the event action.                   |
|                description                | Object |                         Human-translatable-readable description for the event action.                          |
|                   code                    | String |                             Unique human-readable given code of this event action.                             |
|                   color                   | String |               A color code(in hexadecimal format) used to differentiate event actions visually.                |
| [function](#core-resources-eventfunction) | String |           Human-translatable-readable name of event function to which the action is categorized into           |
|                 createdAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was created. |
|                 updatedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"strings": {
  "name": { "en": "Disseminating warning information to the public" },
  "abbreviation": { "en": "DWITTP" },
  "description": { "en": "Disseminating warning information to the public" },
  "code": "DWITTP",
  "color": "#F4EF8D"
},
"function": {
    "_id": "5ddbbc871283e3131b2d41dc",
    "name": { "en": "Direction and Control" },
},
"updatedAt": "2019-12-04T13:42:46.937Z",
"createdAt": "2019-12-04T13:42:20.186Z"
}
```

### Delete EventAction

To delete existing event action, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventactions/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventactions/5de7b7bb9a6ed7342b200f02 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event action attributes:

<br/>

|                   Name                    |  Type  |                                                  Description                                                   |
| :---------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|                   \_id                    | String |                               Unique universal identifier of this event action.                                |
|                   name                    | Object |                             Human-translatable-readable name for the event action.                             |
|     [type](#core-resources-eventtype)     | String |                 Human readable type of a event that the action can be triggered to take place.                 |
|               abbreviation                | Object |                   Human-translatable-readable abbreviation for the name of the event action.                   |
|                description                | Object |                         Human-translatable-readable description for the event action.                          |
|                   code                    | String |                             Unique human-readable given code of this event action.                             |
|                   color                   | String |               A color code(in hexadecimal format) used to differentiate event actions visually.                |
| [function](#core-resources-eventfunction) | String |           Human-translatable-readable name of event function to which the action is categorized into           |
|                 createdAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was created. |
|                 updatedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was updated. |
|                 deletedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"strings": {
  "name": { "en": "Disseminating warning information to the public" },
  "abbreviation": { "en": "DWITTP" },
  "description": { "en": "Disseminating warning information to the public" },
  "code": "DWITTP",
  "color": "#F4EF8D"
},
"function": {
    "_id": "5ddbbc871283e3131b2d41dc",
    "name": { "en": "Direction and Control" },
},
"updatedAt": "2019-12-04T13:42:46.937Z",
"createdAt": "2019-12-04T13:42:20.186Z",
"createdAt": "2019-12-04T15:42:20.186Z"
}
```

### List All EventAction

To list all event actions, send a `GET` request to `https://api.ewea.io/v1/predefines/`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventactions \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of eventaction with the standard event action attributes:

<br/>

|                   Name                    |  Type  |                                                  Description                                                   |
| :---------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|                   \_id                    | String |                               Unique universal identifier of this event action.                                |
|                   name                    | Object |                             Human-translatable-readable name for the event action.                             |
|     [type](#core-resources-eventtype)     | String |                 Human readable type of a event that the action can be triggered to take place.                 |
|               abbreviation                | Object |                   Human-translatable-readable abbreviation for the name of the event action.                   |
|                description                | Object |                         Human-translatable-readable description for the event action.                          |
|                   code                    | String |                             Unique human-readable given code of this event action.                             |
|                   color                   | String |               A color code(in hexadecimal format) used to differentiate event actions visually.                |
| [function](#core-resources-eventfunction) | String |           Human-translatable-readable name of event function to which the action is categorized into           |
|                 createdAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was created. |
|                 updatedAt                 | String | A time value given in ISO8601 combined date and time format that represents when the event action was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
"data": [{
{
"_id": "5de7b7bb9a6ed7342b200f02",
"strings": {
  "name": { "en": "Disseminating warning information to the public" },
  "abbreviation": { "en": "DWITTP" },
  "description": { "en": "Disseminating warning information to the public" },
  "code": "DWITTP",
  "color": "#F4EF8D"
},
"function": {
    "_id": "5ddbbc871283e3131b2d41dc",
    "name": { "en": "Direction and Control" },
  },
"updatedAt": "2019-12-04T13:42:46.937Z",
"createdAt": "2019-12-04T13:42:20.186Z"
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

## EventCatalogue

`EventCatalogue` maps an emergency response activity to the responsible [PARTY](#core-resources-party), [ROLE](#core-resources-partyrole) or [GROUP](#core-resources-partygroup)

### EventCatalogue Schema

`EventCatalogue` have the following attributes:

<br />

|                    Name                     |  Type  |                                                 Description                                                 |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                              Unique universal identifier of this event action.                              |
|      [type](#core-resources-eventtype)      | Object |                   The type of a event in which the action can be triggered to take place.                   |
| [area](#core-resources-administrativelevel) | Array  |                        The administrative area(s) where the action should take place                        |
|  [function](#core-resources-eventfunction)  | Object |                              The group to which the specified action belongs.                               |
|    [action](#core-resources-eventaction)    | Object |                                   The activity that has to be carried out                                   |
|    [groups](#core-resources-partygroup)     | Array  |                          The group(s) of parties that will carry out the activity                           |
|     [roles](#core-resources-partyrole)      | Array  |                          The role(s) of a parties that will carry out the activity                          |
|      [agencies](#core-resources-party)      | Array  |                            The agency(s) that will be carrying out the activity.                            |
|       [focals](#core-resources-party)       | Array  |                         The focal person(s) that will be carrying out the activity                          |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was updated. |

### Create EventCatalogue

To create a new event catalogue, send a`POST` request to`https://api.ewea.io/v1/predefines/eventcatalogues`.The following attributes are supported:

<br />

|                    Name                     |  Type  |                               Description                               | Required |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------: | :------: |
|      [type](#core-resources-eventtype)      | Object | The type of a event in which the action can be triggered to take place. |   true   |
| [area](#core-resources-administrativelevel) | Array  |      The administrative area(s) where the action should take place      |  false   |
|  [function](#core-resources-eventfunction)  | Object |            The group to which the specified action belongs.             |   true   |
|    [action](#core-resources-eventaction)    | Object |                 The activity that has to be carried out                 |   true   |
|    [groups](#core-resources-partygroup)     | Array  |        The group(s) of parties that will carry out the activity         |  false   |
|     [roles](#core-resources-partyrole)      | Array  |        The role(s) of a parties that will carry out the activity        |  false   |
|      [agencies](#core-resources-party)      | Array  |          The agency(s) that will be carrying out the activity.          |  false   |
|       [focals](#core-resources-party)       | Array  |       The focal person(s) that will be carrying out the activity        |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventcatalogues \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
"type": { "Floods" },
"function": { "Communication and Warning" },
"action": { "Disseminating warning information to the public" },
}
```

The response will be a`JSON object` with the standard event group attributes:

<br />

|                    Name                     |  Type  |                                                 Description                                                 |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                              Unique universal identifier of this event action.                              |
|      [type](#core-resources-eventtype)      | Object |                   The type of a event in which the action can be triggered to take place.                   |
| [area](#core-resources-administrativelevel) | Array  |                        The administrative area(s) where the action should take place                        |
|  [function](#core-resources-eventfunction)  | Object |                              The group to which the specified action belongs.                               |
|    [action](#core-resources-eventaction)    | Object |                                   The activity that has to be carried out                                   |
|    [groups](#core-resources-partygroup)     | Array  |                          The group(s) of parties that will carry out the activity                           |
|     [roles](#core-resources-partyrole)      | Array  |                          The role(s) of a parties that will carry out the activity                          |
|      [agencies](#core-resources-party)      | Array  |                            The agency(s) that will be carrying out the activity.                            |
|       [focals](#core-resources-party)       | Array  |                         The focal person(s) that will be carrying out the activity                          |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"type": {
  "_id": "5de7b7bb9a6ed7342b200f02",
  "strings": { "name": { "en": "Floods" }},
}
"function": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Communication and Warning" },
},
"action": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Disseminating warning information to the public" },
},
"groups": [{
  "_id": "5de7b7b79a6ed7342b200dd9",
  "name": { "en": "Telephone Companies" },
}],
"roles": [{
  "_id": "5de7b7b79a6ed7342b200ddc",
  "name": { "en": "Regional Admnistrative Secretary" },
}],
"agencies": [],
"focals": [],
"updatedAt": "2019-12-16T13:42:46.937Z",
"createdAt": "2019-12-16T13:42:20.186Z",
}
```

### Retrieve EventCatalogue

To get an event catalogue, send a`GET` request to`https://api.ewea.io/v1/predefines/eventcatalogues/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventcatalogues/5de7b7bb9a6ed7342b200f02 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a`JSON object` with the standard event catalogue attributes:

<br />

|                    Name                     |  Type  |                                                 Description                                                 |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                              Unique universal identifier of this event action.                              |
|      [type](#core-resources-eventtype)      | Object |                   The type of a event in which the action can be triggered to take place.                   |
| [area](#core-resources-administrativelevel) | Array  |                        The administrative area(s) where the action should take place                        |
|  [function](#core-resources-eventfunction)  | Object |                              The group to which the specified action belongs.                               |
|    [action](#core-resources-eventaction)    | Object |                                   The activity that has to be carried out                                   |
|    [groups](#core-resources-partygroup)     | Array  |                          The group(s) of parties that will carry out the activity                           |
|     [roles](#core-resources-partyrole)      | Array  |                          The role(s) of a parties that will carry out the activity                          |
|      [agencies](#core-resources-party)      | Array  |                            The agency(s) that will be carrying out the activity.                            |
|       [focals](#core-resources-party)       | Array  |                         The focal person(s) that will be carrying out the activity                          |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"type": {
  "_id": "5de7b7bb9a6ed7342b200f02"
  "strings": { "name": { "en": "Floods" }},
}
"function": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Communication and Warning" },
},
"action": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Disseminating warning information to the public" },
},
"groups": [{
  "_id": "5de7b7b79a6ed7342b200dd9",
  "name": { "en": "Telephone Companies" },
}],
"roles": [{
  "_id": "5de7b7b79a6ed7342b200ddc",
  "name": { "en": "Regional Admnistrative Secretary" },
}],
"agencies": [],
"focals": [],
"updatedAt": "2019-12-16T13:42:46.937Z",
"createdAt": "2019-12-16T13:42:20.186Z",
}
```

### Update EventCatalogue

To update existing event catalogue, send a`PATCH` request to`https://api.ewea.io/v1/predefines/eventcatalogues/:id`.The following attributes are supported:

<br />

|                    Name                     |  Type  |                               Description                               | Required |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------: | :------: |
|      [type](#core-resources-eventtype)      | Object | The type of a event in which the action can be triggered to take place. |   true   |
| [area](#core-resources-administrativelevel) | Array  |      The administrative area(s) where the action should take place      |  false   |
|  [function](#core-resources-eventfunction)  | Object |            The group to which the specified action belongs.             |   true   |
|    [action](#core-resources-eventaction)    | Object |                 The activity that has to be carried out                 |   true   |
|    [groups](#core-resources-partygroup)     | Array  |        The group(s) of parties that will carry out the activity         |  false   |
|     [roles](#core-resources-partyrole)      | Array  |        The role(s) of a parties that will carry out the activity        |  false   |
|      [agencies](#core-resources-party)      | Array  |          The agency(s) that will be carrying out the activity.          |  false   |
|       [focals](#core-resources-party)       | Array  |       The focal person(s) that will be carrying out the activity        |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventcatalogues/5de7b7bb9a6ed7342b200f02 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "type": { "Floods" },
  "function": { "Communication and Warning" },
  "action": { "Disseminating warning information to the public" },
}'
```

The response will be a`JSON object` with the standard event catalogue attributes:

<br />

|                    Name                     |  Type  |                                                 Description                                                 |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                              Unique universal identifier of this event action.                              |
|      [type](#core-resources-eventtype)      | Object |                   The type of a event in which the action can be triggered to take place.                   |
| [area](#core-resources-administrativelevel) | Array  |                        The administrative area(s) where the action should take place                        |
|  [function](#core-resources-eventfunction)  | Object |                              The group to which the specified action belongs.                               |
|    [action](#core-resources-eventaction)    | Object |                                   The activity that has to be carried out                                   |
|    [groups](#core-resources-partygroup)     | Array  |                          The group(s) of parties that will carry out the activity                           |
|     [roles](#core-resources-partyrole)      | Array  |                          The role(s) of a parties that will carry out the activity                          |
|      [agencies](#core-resources-party)      | Array  |                            The agency(s) that will be carrying out the activity.                            |
|       [focals](#core-resources-party)       | Array  |                         The focal person(s) that will be carrying out the activity                          |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"type": {
  "_id": "5de7b7bb9a6ed7342b200f02"
  "strings": { "name": { "en": "Floods" }},
}
"function": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Communication and Warning" },
},
"action": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Disseminating warning information to the public" },
},
"groups": [{
  "_id": "5de7b7b79a6ed7342b200dd9",
  "name": { "en": "Telephone Companies" },
}],
"roles": [{
  "_id": "5de7b7b79a6ed7342b200ddc",
  "name": { "en": "Regional Admnistrative Secretary" },
}],
"agencies": [],
"focals": [],
"updatedAt": "2019-12-16T13:42:46.937Z",
"createdAt": "2019-12-16T13:42:20.186Z",
}
```

### Delete EventCatalogue

To delete existing event catalogue, send a`DELETE` request to`https://api.ewea.io/v1/predefines/eventcatalogues/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventcatalogues/5de7b7bb9a6ed7342b200f02 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a`JSON object` with the standard event catalogue attributes:

<br />

|                    Name                     |  Type  |                                                 Description                                                 |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                              Unique universal identifier of this event action.                              |
|      [type](#core-resources-eventtype)      | Object |                   The type of a event in which the action can be triggered to take place.                   |
| [area](#core-resources-administrativelevel) | Array  |                        The administrative area(s) where the action should take place                        |
|  [function](#core-resources-eventfunction)  | Object |                              The group to which the specified action belongs.                               |
|    [action](#core-resources-eventaction)    | Object |                                   The activity that has to be carried out                                   |
|    [groups](#core-resources-partygroup)     | Array  |                          The group(s) of parties that will carry out the activity                           |
|     [roles](#core-resources-partyrole)      | Array  |                          The role(s) of a parties that will carry out the activity                          |
|      [agencies](#core-resources-party)      | Array  |                            The agency(s) that will be carrying out the activity.                            |
|       [focals](#core-resources-party)       | Array  |                         The focal person(s) that will be carrying out the activity                          |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was updated. |
|                  deletedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
"_id": "5de7b7bb9a6ed7342b200f02",
"type": {
  "_id": "5de7b7bb9a6ed7342b200f02"
  "strings": { "name": { "en": "Floods" }},
}
"function": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Communication and Warning" },
},
"action": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Disseminating warning information to the public" },
},
"groups": [{
  "_id": "5de7b7b79a6ed7342b200dd9",
  "name": { "en": "Telephone Companies" },
}],
"roles": [{
  "_id": "5de7b7b79a6ed7342b200ddc",
  "name": { "en": "Regional Admnistrative Secretary" },
}],
"agencies": [],
"focals": [],
"updatedAt": "2019-12-16T13:42:46.937Z",
"createdAt": "2019-12-16T13:42:20.186Z",
"deletedAt": "2019-12-16T13:42:20.186Z",
}
```

### List All EventCatalogue

To list all event catalogues, send a`GET` request to`https://api.ewea.io/v1/predefines/`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventcatalogues \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a`JSON object` with a`data key`.The values in the`data key` are set of eventcatalogue with the standard event catalogue attributes:

<br />

|                    Name                     |  Type  |                                                 Description                                                 |
| :-----------------------------------------: | :----: | :---------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                              Unique universal identifier of this event action.                              |
|      [type](#core-resources-eventtype)      | Object |                   The type of a event in which the action can be triggered to take place.                   |
| [area](#core-resources-administrativelevel) | Array  |                        The administrative area(s) where the action should take place                        |
|  [function](#core-resources-eventfunction)  | Object |                              The group to which the specified action belongs.                               |
|    [action](#core-resources-eventaction)    | Object |                                   The activity that has to be carried out                                   |
|    [groups](#core-resources-partygroup)     | Array  |                          The group(s) of parties that will carry out the activity                           |
|     [roles](#core-resources-partyrole)      | Array  |                          The role(s) of a parties that will carry out the activity                          |
|      [agencies](#core-resources-party)      | Array  |                            The agency(s) that will be carrying out the activity.                            |
|       [focals](#core-resources-party)       | Array  |                         The focal person(s) that will be carrying out the activity                          |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the catalogue was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
"data": [{
"_id": "5de7b7bb9a6ed7342b200f02",
"type": {
  "_id": "5de7b7bb9a6ed7342b200f02"
  "strings": { "name": { "en": "Floods" }},
}
"function": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Communication and Warning" },
},
"action": {
  "_id": "5ddbbc871283e3131b2d41dc",
  "name": { "en": "Disseminating warning information to the public" },
},
"groups": [{
  "_id": "5de7b7b79a6ed7342b200dd9",
  "name": { "en": "Telephone Companies" },
}],
"roles": [{
  "_id": "5de7b7b79a6ed7342b200ddc",
  "name": { "en": "Regional Admnistrative Secretary" },
}],
"agencies": [],
"focals": [],
"updatedAt": "2019-12-16T13:42:46.937Z",
"createdAt": "2019-12-16T13:42:20.186Z",
}],
"total": 198,
"size": 10,
"limit": 10,
"skip": 0,
"page": 10,
"pages": 20,
"lastModified": "2019-12-05T17:14:48.206Z",
"hasMore": true
```

## Event

`Event` A representation of an entity which define and track an instance(or occurrence) of an emergency(or disaster) event.

### Event Schema

`Event` has the following attributes:

<br />

|                    Name                     |  Type  |                                                          Description                                                           |
| :-----------------------------------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                                           Unique universal identifier of this event.                                           |
|     [group](#core-resources-eventgroup)     | Object |                                          Event group underwhich an event belongs to.                                           |
|      [type](#core-resources-eventtype)      | Object |                                           Event type underwhich an event belongs to.                                           |
| [certainty](#core-resources-eventcertainty) | Object |                                           Currently assigned certainty of an event.                                            |
|  [severity](#core-resources-eventseverity)  | Object |                                            Currently assigned severity of an event.                                            |
|                    stage                    | String |                                           Human readable evolving step of an event.                                            |
|                   number                    | String |                                         Human readable, unique identifier of an event.                                         |
|                   address                   | String |                               A human readable description of location where an event happened.                                |
|                  location                   | Point  |                         A geo-point specifying longitude and latitude pair of the address of an event.                         |
|                   causes                    | String |                                   A brief human readable summary about cause(s) of an event.                                   |
|                 description                 | String |                    A brief summary about an event i.e additional details that clarify more about an event.                     |
|                   places                    | String |                                Human readable text describing the affected area(s) of an event.                                |
| [areas](#core-resources-administrativearea) | Array  |                                          Affected administrative area(s) of an event.                                          |
|                instructions                 | String |                           A brief human readable, caution(s) to be taken by responders on an event.                            |
|                interventions                | String |                                           A brief human readable effect(s) an event.                                           |
|                   impacts                   | String |                                           A brief human readable effect(s) an event.                                           |
|                   remarks                   | String |                              A brief human readable comments and recommendations about an event.                               |
|                  startedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event was effective occured(or reported). |
|                   endedAt                   |  Date  |  A time value given in ISO8601 combined date and time format that represents when the event was declared no longer a threat.   |
|                  createdAt                  |  Date  |            A time value given in ISO8601 combined date and time format that represents when the event was created.             |
|                  updatedAt                  |  Date  |            A time value given in ISO8601 combined date and time format that represents when the event was updated.             |

### Create Event

To create a new event, send a `POST` request to `https://api.ewea.io/v1/events`. The following attributes are supported:

<br />

|                    Name                     |  Type  |                                                          Description                                                           | Required |
| :-----------------------------------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------: | :------: |
|     [group](#core-resources-eventgroup)     | Object |                                          Event group underwhich an event belongs to.                                           |   true   |
|      [type](#core-resources-eventtype)      | Object |                                           Event type underwhich an event belongs to.                                           |   true   |
| [certainty](#core-resources-eventcertainty) | Object |                                           Currently assigned certainty of an event.                                            |   true   |
|  [severity](#core-resources-eventseverity)  | Object |                                            Currently assigned severity of an event.                                            |   true   |
|                    stage                    | String |                                           Human readable evolving step of an event.                                            |   true   |
|                   number                    | String |                                         Human readable, unique identifier of an event.                                         |   true   |
|                   address                   | String |                               A human readable description of location where an event happened.                                |  false   |
|                  location                   | Point  |                         A geo-point specifying longitude and latitude pair of the address of an event.                         |  false   |
|                   causes                    | String |                                   A brief human readable summary about cause(s) of an event.                                   |   true   |
|                 description                 | String |                    A brief summary about an event i.e additional details that clarify more about an event.                     |   true   |
|                   places                    | String |                                Human readable text describing the affected area(s) of an event.                                |   true   |
| [areas](#core-resources-administrativearea) | Array  |                                          Affected administrative area(s) of an event.                                          |   true   |
|                instructions                 | String |                           A brief human readable, caution(s) to be taken by responders on an event.                            |  false   |
|                interventions                | String |                                           A brief human readable effect(s) an event.                                           |  false   |
|                   impacts                   | String |                                           A brief human readable effect(s) an event.                                           |  false   |
|                   remarks                   | String |                              A brief human readable comments and recommendations about an event.                               |  false   |
|                  startedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event was effective occured(or reported). |  false   |
|                   endedAt                   |  Date  |  A time value given in ISO8601 combined date and time format that represents when the event was declared no longer a threat.   |  false   |
|                  createdAt                  |  Date  |            A time value given in ISO8601 combined date and time format that represents when the event was created.             |  false   |
|                  updatedAt                  |  Date  |            A time value given in ISO8601 combined date and time format that represents when the event was updated.             |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/events \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "type": "5de93ad82bc376633fe1ec5b",
    "stage": "Event",
    "number": "FL-2018-000038-TZA",
    "causes": "Heavy rainfall",
    "description": "Strong pressure gradient force from the ocean"
  }'
```

The response will be a `JSON object` with the standard event attributes:

|               Name                |  Type  |                                                        Description                                                         |
| :-------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------------------: |
|               \_id                | String |                                         Unique universal identifier of this event.                                         |
| [type](#core-resources-eventtype) | Object |                                         Event type underwhich an event belongs to.                                         |
|               stage               | String |                                         Human readable evolving step of an event.                                          |
|              number               | String |                                       Human readable, unique identifier of an event.                                       |
|              causes               | String |                                 A brief human readable summary about cause(s) of an event.                                 |
|            description            | String |                  A brief summary about an event i.e additional details that clarify more about an event.                   |
|             startedAt             |  Date  | A time value given in ISO8601 combined date and time format that represents when event was effective occured(or reported). |
|             createdAt             | String |            A time value given in ISO8601 combined date and time format that represents when event was created.             |
|             updatedAt             | String |            A time value given in ISO8601 combined date and time format that represents when event was updated.             |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5dea348e15ce9664879eafb3",
  "type": "5de93ad82bc376633fe1ec5b",
  "stage": "Event",
  "number": "FL-2018-000037-TZA",
  "causes": "Heavy rainfall",
  "description": "Strong pressure gradient force from the ocean",
  "startedAt": "2019-12-06T10:59:26.224Z",
  "updatedAt": "2019-12-06T10:59:26.226Z",
  "createdAt": "2019-12-06T10:59:26.226Z"
}
```

### Retrieve Event

To get an event, send a `GET` request to `https://api.ewea.io/v1/events/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events/5ddbbc871283e3131b2d41f4 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event attributes:

<br/>

|                    Name                     |  Type  |                                                        Description                                                         |
| :-----------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                                         Unique universal identifier of this event.                                         |
|     [group](#core-resources-eventgroup)     | Object |                                        Event group underwhich an event belongs to.                                         |
|      [type](#core-resources-eventtype)      | Object |                                         Event type underwhich an event belongs to.                                         |
| [certainty](#core-resources-eventcertainty) | Object |                                         Currently assigned certainty of an event.                                          |
|  [severity](#core-resources-eventseverity)  | Object |                                          Currently assigned severity of an event.                                          |
|                    stage                    | String |                                         Human readable evolving step of an event.                                          |
|                   number                    | String |                                       Human readable, unique identifier of an event.                                       |
|                   address                   | String |                             A human readable description of location where an event happened.                              |
|                  location                   | Point  |                       A geo-point specifying longitude and latitude pair of the address of an event.                       |
|                   causes                    | String |                                 A brief human readable summary about cause(s) of an event.                                 |
|                 description                 | String |                  A brief summary about an event i.e additional details that clarify more about an event.                   |
|                   places                    | String |                              Human readable text describing the affected area(s) of an event.                              |
| [areas](#core-resources-administrativearea) | Array  |                                        Affected administrative area(s) of an event.                                        |
|                instructions                 | String |                         A brief human readable, caution(s) to be taken by responders on an event.                          |
|                interventions                | String |                                         A brief human readable effect(s) an event.                                         |
|                   impacts                   | String |                                         A brief human readable effect(s) an event.                                         |
|                   remarks                   | String |                            A brief human readable comments and recommendations about an event.                             |
|                  startedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when event was effective occured(or reported). |
|                   endedAt                   |  Date  |  A time value given in ISO8601 combined date and time format that represents when event was declared no longer a threat.   |
|                  createdAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was created             |
|                  updatedAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was updated             |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5d535a0a62b47901d3294ff8",
  "type": {
    "_id": "5de93ad82bc376633fe1ec5b"
    "strings": { "name": { "en": "Flood" }},
  },
  "stage": "Event",
  "number": "FL-2018-000033-TZA",
  "causes": "Heavy rainfall",
  "description": "Overflowing water from the dam",
  "places": "Ilala, Temeke, Dar es Salaam",
  "instructions": "Continue monitor the situation",
  "interventions": "Affected victims were evacuated and relocated",
  "impacts": "55 people affected, 72 houses destroyed and 9 schools damaged",
  "remarks": "Relief items should be provided to the victims",
  "startedAt": "2019-10-17T07:53:32.831Z",
  "endedAt": "2019-10-19T07:53:32.831Z",
  "updatedAt": "2019-12-05T17:14:48.206Z",
  "createdAt": "2019-12-05T17:14:00.659Z"
}
```

### Update Event

To update existing event, send a `PATCH` request to `https://api.ewea.io/v1/events/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                                       Description                                       |
| :---------: | :----: | :-------------------------------------------------------------------------------------: |
| description | String | A brief summary about an event i.e additional details that clarify more about an event. |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/events/5d535a0a62b47901d3294ff8 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "description": "Overflow of water from the dam"
  }'
```

The response will be a `JSON object` with the standard events attributes:

<br/>

|                    Name                     |  Type  |                                                        Description                                                         |
| :-----------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                                         Unique universal identifier of this event.                                         |
|     [group](#core-resources-eventgroup)     | Object |                                        Event group underwhich an event belongs to.                                         |
|      [type](#core-resources-eventtype)      | Object |                                         Event type underwhich an event belongs to.                                         |
| [certainty](#core-resources-eventcertainty) | Object |                                         Currently assigned certainty of an event.                                          |
|  [severity](#core-resources-eventseverity)  | Object |                                          Currently assigned severity of an event.                                          |
|                    stage                    | String |                                         Human readable evolving step of an event.                                          |
|                   number                    | String |                                       Human readable, unique identifier of an event.                                       |
|                   address                   | String |                             A human readable description of location where an event happened.                              |
|                  location                   | Point  |                       A geo-point specifying longitude and latitude pair of the address of an event.                       |
|                   causes                    | String |                                 A brief human readable summary about cause(s) of an event.                                 |
|                 description                 | String |                  A brief summary about an event i.e additional details that clarify more about an event.                   |
|                   places                    | String |                              Human readable text describing the affected area(s) of an event.                              |
| [areas](#core-resources-administrativearea) | Array  |                                        Affected administrative area(s) of an event.                                        |
|                instructions                 | String |                         A brief human readable, caution(s) to be taken by responders on an event.                          |
|                interventions                | String |                                         A brief human readable effect(s) an event.                                         |
|                   impacts                   | String |                                         A brief human readable effect(s) an event.                                         |
|                   remarks                   | String |                            A brief human readable comments and recommendations about an event.                             |
|                  startedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when event was effective occured(or reported). |
|                   endedAt                   |  Date  |  A time value given in ISO8601 combined date and time format that represents when event was declared no longer a threat.   |
|                  createdAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was created             |
|                  updatedAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was updated             |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5d535a0a62b47901d3294ff8",
  "type": {
    "_id": "5de93ad82bc376633fe1ec5b"
    "strings": {"name": { "en": "Flood"}},
  },
  "stage": "Event",
  "number": "FL-2018-000033-TZA",
  "causes": "Heavy rainfall",
  "description": "Overflow of water from the dam",
  "places": "Ilala, Temeke, Dar es Salaam",
  "instructions": "Continue monitor the situation",
  "interventions": "Affected victims were evacuated and relocated",
  "impacts": "55 people affected, 72 houses destroyed and 9 schools damaged",
  "remarks": "Relief items should be provided to the victims",
  "startedAt": "2019-10-17T07:53:32.831Z",
  "endedAt": "2019-10-19T07:53:32.831Z",
  "updatedAt": "2019-12-06T11:38:54.042Z",
  "createdAt": "2019-12-05T17:14:00.659Z"
}
```

### Delete Event

To delete existing event, send a `DELETE` request to `https://api.ewea.io/v1/events/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/events/5d535a0a62b47901d3294ff8 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard party attributes:

<br/>

|                    Name                     |  Type  |                                                        Description                                                         |
| :-----------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                                         Unique universal identifier of this event.                                         |
|     [group](#core-resources-eventgroup)     | Object |                                        Event group underwhich an event belongs to.                                         |
|      [type](#core-resources-eventtype)      | Object |                                         Event type underwhich an event belongs to.                                         |
| [certainty](#core-resources-eventcertainty) | Object |                                         Currently assigned certainty of an event.                                          |
|  [severity](#core-resources-eventseverity)  | Object |                                          Currently assigned severity of an event.                                          |
|                    stage                    | String |                                         Human readable evolving step of an event.                                          |
|                   number                    | String |                                       Human readable, unique identifier of an event.                                       |
|                   address                   | String |                             A human readable description of location where an event happened.                              |
|                  location                   | Point  |                       A geo-point specifying longitude and latitude pair of the address of an event.                       |
|                   causes                    | String |                                 A brief human readable summary about cause(s) of an event.                                 |
|                 description                 | String |                  A brief summary about an event i.e additional details that clarify more about an event.                   |
|                   places                    | String |                              Human readable text describing the affected area(s) of an event.                              |
| [areas](#core-resources-administrativearea) | Array  |                                        Affected administrative area(s) of an event.                                        |
|                instructions                 | String |                         A brief human readable, caution(s) to be taken by responders on an event.                          |
|                interventions                | String |                                         A brief human readable effect(s) an event.                                         |
|                   impacts                   | String |                                         A brief human readable effect(s) an event.                                         |
|                   remarks                   | String |                            A brief human readable comments and recommendations about an event.                             |
|                  startedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when event was effective occured(or reported). |
|                   endedAt                   |  Date  |  A time value given in ISO8601 combined date and time format that represents when event was declared no longer a threat.   |
|                  createdAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was created             |
|                  updatedAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was updated             |
|                  deletedAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was deleted             |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5d535a0a62b47901d3294ff8",
  "type": {
    "_id": "5de93ad82bc376633fe1ec5b"
    "strings": { "name": { "en": "Flood"}},
  },
  "stage": "Event",
  "number": "FL-2018-000033-TZA",
  "causes": "Heavy rainfall",
  "description": "Overflow of water from the dam",
  "places": "Ilala, Temeke, Dar es Salaam",
  "instructions": "Continue monitor the situation",
  "interventions": "Affected victims were evacuated and relocated",
  "impacts": "55 people affected, 72 houses destroyed and 9 schools damaged",
  "remarks": "Relief items should be provided to the victims",
  "startedAt": "2019-10-17T07:53:32.831Z",
  "endedAt": "2019-10-19T07:53:32.831Z",
  "updatedAt": "2019-12-06T11:45:23.474Z",
  "createdAt": "2019-12-05T17:14:00.659Z",
  "deletedAt": "2019-12-06T11:45:23.446Z"
}
```

### List All Event

To list all event , send a `GET` request to `https://api.ewea.io/v1/events/`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/events \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event with the standard event attributes:

<br/>

|                    Name                     |  Type  |                                                        Description                                                         |
| :-----------------------------------------: | :----: | :------------------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                                         Unique universal identifier of this event.                                         |
|     [group](#core-resources-eventgroup)     | Object |                                        Event group underwhich an event belongs to.                                         |
|      [type](#core-resources-eventtype)      | Object |                                         Event type underwhich an event belongs to.                                         |
| [certainty](#core-resources-eventcertainty) | Object |                                         Currently assigned certainty of an event.                                          |
|  [severity](#core-resources-eventseverity)  | Object |                                          Currently assigned severity of an event.                                          |
|                   number                    | String |                                       Human readable, unique identifier of an event.                                       |
|                   address                   | String |                             A human readable description of location where an event happened.                              |
|                  location                   | Point  |                       A geo-point specifying longitude and latitude pair of the address of an event.                       |
|                   causes                    | String |                                 A brief human readable summary about cause(s) of an event.                                 |
|                 description                 | String |                  A brief summary about an event i.e additional details that clarify more about an event.                   |
|                   places                    | String |                              Human readable text describing the affected area(s) of an event.                              |
| [areas](#core-resources-administrativearea) | Array  |                                        Affected administrative area(s) of an event.                                        |
|                instructions                 | String |                         A brief human readable, caution(s) to be taken by responders on an event.                          |
|                interventions                | String |                                         A brief human readable effect(s) an event.                                         |
|                   impacts                   | String |                                         A brief human readable effect(s) an event.                                         |
|                   remarks                   | String |                            A brief human readable comments and recommendations about an event.                             |
|                  startedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when event was effective occured(or reported). |
|                   endedAt                   |  Date  |  A time value given in ISO8601 combined date and time format that represents when event was declared no longer a threat.   |
|                  createdAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was created             |
|                  updatedAt                  |  Date  |             A time value given in ISO8601 combined date and time format that represents when event was updated             |

> Example Response:

```curl
HTTP/1.1 200 Success

{
  "data": [{
    "_id": "5d535a0a62b47901d3294ff8",
    "type": {
      "_id": "5de93ad82bc376633fe1ec5b"
      "strings": { "name": { "en": "Flood"}},
    },
    "stage": "Event",
    "number": "FL-2018-000033-TZA",
    "causes": "Heavy rainfall",
    "description": "Overflowing water from the dam",
    "places": "Ilala, Temeke, Dar es Salaam",
    "instructions": "Continue monitor the situation",
    "interventions": "Affected victims were evacuated and relocated",
    "impacts": "55 people affected, 72 houses destroyed and 9 schools damaged",
    "remarks": "Relief items should be provided to the victims",
    "startedAt": "2019-10-17T07:53:32.831Z",
    "endedAt": "2019-10-19T07:53:32.831Z",
    "updatedAt": "2019-12-05T17:14:48.206Z",
    "createdAt": "2019-12-05T17:14:00.659Z"
  }],
  "total": 1,
  "size": 1,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 1,
  "lastModified": "2019-12-05T17:14:48.206Z",
  "hasMore": false
}

```

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
    "strings": {
      "name": { "en": "City" },
      "description": { "en": "The name of the metropolitan area itself" },
      "color": "#F9C5A7"
    }
    "level": 1
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
  "strings": {
    "name": { "en": "City" },
    "description": { "en": "The name of the metropolitan area itself" },
    "color": "#F9C5A7"
  },
  "level": 1
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
  "strings": {
    "name": { "en": "City" },
    "description": { "en": "The name of the metropolitan area itself" },
    "color": "#F9C5A7"
  },
  "level": 1,
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
  "strings": {
    "name": { "en": "City" },
    "description": { "en": "" }
  },
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
  "strings": {
    "name": { "en": "City" },
    "description": { "en": "The name of the metropolitan area itself" },
    "color": "#F9C5A7"
  },
  "level": 0
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
|  deletedAt  | String | A time value given in ISO8601 combined date and time format that represents when the administrative level was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dabbc871283e3131b2d41f2",
  "strings": {
    "name": { "en": "City" },
    "description": { "en": "" },
    "color": "#F9C5A7"
  },
  "level": 1
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
  "strings": {
    "name": { "en": "City" },
    "description": { "en": "The name of the metropolitan area itself" },
    "color": "#F9C5A7"
  },
  "level": 1
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

`AdministrativeArea` is a portion of a country or other region delineated for the purpose of administration. Also can be referred to region, subnational entity, constituent unit or country subdivision

### AdministrativeArea Schema

`AdministrativeArea` has the following attributes:

<br />

|     Name     |  Type  |                                                      Description                                                      |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                Unique universal identifier of the administrative area.                                |
|     name     | Object |                             Human-translatable-readable name for the administrative area.                             |
| abbreviation | Object |                                 Human readable short form of the administrative area.                                 |
| description  | Object |                         Human-translatable-readable description for the administrative area.                          |
|    color     | String |               A color code(in hexadecimal format) used to differentiate administrative areas visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was updated. |

### Create AdministrativeArea

To create a new feature, send a `POST` request to `https://api.ewea.io/v1/predefines/administrativeareas`. The following attributes are supported:

<br/>

|    Name     |  Type  |                             Description                             | Required |
| :---------: | :----: | :-----------------------------------------------------------------: | :------: |
|    name     | Object |    Human-translatable-readable name for the administrative area     |   true   |
| description | Object | Human-translatable-readable description for the administrative area |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/adminstrativeareas \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": {
    "name": { "en": "Kawe"},
    "description": { "en": "Kawe Ward" }
  }
}'
```

The response will be a `JSON object` with the standard administrative area attributes:

<br/>

|     Name     |  Type  |                                                      Description                                                      |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                Unique universal identifier of the administrative area.                                |
|     name     | Object |                             Human-translatable-readable name for the administrative area.                             |
| abbreviation | Object |                                 Human readable short form of the administrative area.                                 |
| description  | Object |                         Human-translatable-readable description for the administrative area.                          |
|    color     | String |               A color code(in hexadecimal format) used to differentiate administrative areas visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5df2001053baadbcbfd979be",
  "strings": {
    "name": { "en": "Kawe","sw": "Kawe"},
    "abbreviation": { "en": "K", "sw": "K"},
    "description": {
      "en": "Kawe Ward",
      "sw": "Kawe Ward"
    },
    "code": "K",
    "color": "#F9C5A7"
  }
  "updatedAt": "2019-12-12T08:53:36.747Z",
  "createdAt": "2019-12-12T08:53:36.747Z"
}
```

### Retrieve AdministrativeArea

To get a administrative areas, send a `GET` request to `https://api.ewea.io/v1/predefines/administrativeareas/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/administrativeareas/5df2001053baadbcbfd979be \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard administrative areas attributes:

<br/>

|     Name     |  Type  |                                                      Description                                                      |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                Unique universal identifier of the administrative area.                                |
|     name     | Object |                             Human-translatable-readable name for the administrative area.                             |
| abbreviation | Object |                                 Human readable short form of the administrative area.                                 |
| description  | Object |                         Human-translatable-readable description for the administrative area.                          |
|    color     | String |               A color code(in hexadecimal format) used to differentiate administrative areas visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5df2001053baadbcbfd979be",
  "strings": {
    "name": { "en": "Kawe","sw": "Kawe"},
    "abbreviation": { "en": "K", "sw": "K"},
    "description": {
      "en": "Kawe Ward",
      "sw": "Kawe Ward"
    },
    "code": "K",
    "color": "#F9C5A7"
  }
  "updatedAt": "2019-12-12T08:53:36.747Z",
  "createdAt": "2019-12-12T08:53:36.747Z"
}
```

### Update AdministrativeArea

To update existing administrative area, send a `PATCH` request to `https://api.ewea.io/v1/predefines/administrativeareas/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                             Description                              | Required |
| :---------: | :----: | :------------------------------------------------------------------: | :------: |
|    name     | Object |    Human-translatable-readable name for the administrative area.     |   true   |
| description | Object | Human-translatable-readable description for the administrative area. |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/administrativeareas/5df2001053baadbcbfd979be \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": {
    "name": { "en": "Kawe" },
    "description": { "en": "Kawe Sub Ward" },
  }
}'
```

The response will be a `JSON object` with the standard administrative areas attributes:

<br/>

|     Name     |  Type  |                                                      Description                                                      |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                Unique universal identifier of the administrative area.                                |
|     name     | Object |                             Human-translatable-readable name for the administrative area.                             |
| abbreviation | Object |                                 Human readable short form of the administrative area.                                 |
| description  | Object |                         Human-translatable-readable description for the administrative area.                          |
|    color     | String |               A color code(in hexadecimal format) used to differentiate administrative areas visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5df2001053baadbcbfd979be",
  "strings": {
    "name": { "en": "Kawe","sw": "Kawe"},
    "abbreviation": { "en": "K", "sw": "K"},
    "description": { "en": "Kawe", "sw": "Kawe Sub Ward" },
    "code": "K",
    "color": "#F9C5A7"
  }
  "updatedAt": "2019-12-12T08:53:36.747Z",
  "createdAt": "2019-12-12T08:53:36.747Z"
}
```

### Delete AdministrativeArea

To delete existing administrative area, send a `DELETE` request to `https://api.ewea.io/v1/predefines/administrativeareas/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/administrativeareas/5df2001053baadbcbfd979be \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard administrative area attributes:

<br/>

|     Name     |  Type  |                                                      Description                                                      |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                Unique universal identifier of the administrative area.                                |
|     name     | Object |                             Human-translatable-readable name for the administrative area.                             |
| abbreviation | Object |                                 Human readable short form of the administrative area.                                 |
| description  | Object |                         Human-translatable-readable description for the administrative area.                          |
|    color     | String |               A color code(in hexadecimal format) used to differentiate administrative areas visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was updated. |
|  deletedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5df2001053baadbcbfd979be",
  "strings": {
    "name": { "en": "Kawe","sw": "Kawe"},
    "abbreviation": { "en": "K", "sw": "K"},
    "description": { "en": "Kawe Sub Ward", "sw": "Kawe Sub Ward" },
    "code": "K",
    "color": "#F9C5A7"
  }
  "updatedAt": "2019-12-12T08:53:36.747Z",
  "createdAt": "2019-12-12T08:53:36.747Z",
  "deletedAt": "2019-12-12T09:53:36.747Z",
}
```

### List All AdministrativeAreas

To list all administrative areas, send a `GET` request to `https://api.ewea.io/v1/predefines/administrativeareas`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/administrativeareas \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of admnistrative areas with the standard administrative areas attributes:

<br/>

|     Name     |  Type  |                                                      Description                                                      |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------------------------: |
|     \_id     | String |                                Unique universal identifier of the administrative area.                                |
|     name     | Object |                             Human-translatable-readable name for the administrative area.                             |
| abbreviation | Object |                                 Human readable short form of the administrative area.                                 |
| description  | Object |                         Human-translatable-readable description for the administrative area.                          |
|    color     | String |               A color code(in hexadecimal format) used to differentiate administrative areas visually.                |
|  createdAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was created. |
|  updatedAt   | String | A time value given in ISO8601 combined date and time format that represents when the administrative area was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5c6ea7dae1dc700018aac95b",
    "strings": {
      "name": { "en": "Tandale", "sw": "Tandale" },
      "abbreviation": { "en": "T", "sw": "T" },
      "description": { "en": "Tandale", "sw": "Tandale" },
      "code": "T",
      "color": "#E0CCFF"
    },
    "color": "#86C7EE"
    "updatedAt": "2019-12-21T13:30:04.340Z",
    "createdAt": "2019-12-21T13:30:04.340Z"
  }],
  "total": 458,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 46,
  "lastModified": "2019-12-12T10:19:40.211Z",
  "hasMore": true
}
```

## FeatureType

`FeatureType` classification of geographical feature of interest both natural and man made used in emergency(or disaster) management(or event).

### FeatureType Schema

`FeatureType` have the following attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                   |
| :-------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature type.                                |
|   name    | Object |                             Human-translatable-readable name for the feature type.                             |
|   code    | String |                             Unique Human-readable given code of this feature type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate feature types visually.                |
| createdAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was created. |
| updatedAt |  Date  |     A time value given in ISO8601 combined date and time format that represents when the type was updated.     |
| deletedAt |  Date  |     A time value given in ISO8601 combined date and time format that represents when the type was deleted.     |

### Create FeatureType

To create a new feature type, send a `POST` request to `https://api.ewea.io/v1/predefines/featuretypes`. The following attributes are supported:

<br/>

| Name  |  Type  |                                   Description                                   | Required |
| :---: | :----: | :-----------------------------------------------------------------------------: | :------: |
| name  | Object |              Human-translatable-readable name for the event type.               |   true   |
| code  | String |              Unique Human-readable given code of this event type.               |  false   |
| color | String | A color code(in hexadecimal format) used to differentiate event types visually. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/featuretypes \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": { "name": { "en": "Power plant" }}
  }'
```

The response will be a `JSON object` with the standard feature type attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                   |
| :-------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature type.                                |
|   name    | Object |                             Human-translatable-readable name for the feature type.                             |
|   code    | String |                             Unique Human-readable given code of this feature type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate feature types visually.                |
| createdAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was created. |
| updatedAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5df8e3b67d568860013e0d99",
  "strings": {
    "name": { "en": "Power plant" },
    "code": "PP",
    "color": "#B3FF7A"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Retrieve FeatureType

To get a featuretype, send a `GET` request to `https://api.ewea.io/v1/predefines/featuretypes/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/featuretypes/5df8e3b67d568860013e0d99 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard feature type attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                   |
| :-------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature type.                                |
|   name    | Object |                             Human-translatable-readable name for the feature type.                             |
|   code    | String |                             Unique Human-readable given code of this feature type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate feature types visually.                |
| createdAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was created. |
| updatedAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5df8e3b67d568860013e0d99",
  "strings": {
    "name": { "en": "Power plant" },
    "code": "PP",
    "color": "#B3FF7A"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Update FeatureType

To update existing feature type, send a `PATCH` request to `https://api.ewea.io/v1/predefines/featuretypes/:id`. The following attributes are supported:

<br/>

| Name |  Type  |                      Description                       |
| :--: | :----: | :----------------------------------------------------: |
| name | Object | Human-translatable-readable name for the feature type. |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/featuretypes/5df8e3b67d568860013e0d99 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": { "name": { "en": "Power plants" }}
  }'
```

The response will be a `JSON object` with the standard feature type attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                   |
| :-------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature type.                                |
|   name    | Object |                             Human-translatable-readable name for the feature type.                             |
|   code    | String |                             Unique Human-readable given code of this feature type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate feature types visually.                |
| createdAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was created. |
| updatedAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5df8e3b67d568860013e0d99",
  "strings": {
    "code": "PP",
    "name": { "en": "Power plants" },
    "color": "#86C7E8"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z"
}
```

### Delete FeatureType

To delete existing feature type, send a `DELETE` request to `https://api.ewea.io/v1/predefines/featuretypes/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/featuretypes/5df8e3b67d568860013e0d99 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard feature type attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                   |
| :-------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature type.                                |
|   name    | Object |                             Human-translatable-readable name for the feature type.                             |
|   code    | String |                             Unique Human-readable given code of this feature type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate feature types visually.                |
| createdAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was created. |
| updatedAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was updated. |
| deletedAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5df8e3b67d568860013e0d99",
  "strings": {
    "code": "PP",
    "name": { "en": "Power plants" },
    "color": "#86C7E8"
  },
  "updatedAt": "2019-02-21T13:30:04.340Z",
  "createdAt": "2019-02-21T13:30:04.340Z",
  "deletedAt": "2019-02-21T15:30:04.340Z"
}
```

### List All FeatureType

To list all feature types, send a `GET` request to `https://api.ewea.io/v1/predefines/featuretypes`.

> Example **Request**

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/featuretypes \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of event type with the standard feature type attributes:

<br/>

|   Name    |  Type  |                                                  Description                                                   |
| :-------: | :----: | :------------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature type.                                |
|   code    | String |                             Unique Human-readable given code of this feature type.                             |
|   name    | Object |                             Human-translatable-readable name for the feature type.                             |
|   color   | String |               A color code(in hexadecimal format) used to differentiate feature types visually.                |
| createdAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was created. |
| updatedAt |  Date  | A time value given in ISO8601 combined date and time format that represents when the feature type was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
    "_id": "5df8e3b67d568860013e0d99",
    "strings": {
      "name": { "en": "Hospital" },
      "code": "H",
      "color": "#EEFFB2"
    },
    "updatedAt": "2019-02-21T13:30:04.340Z",
    "createdAt": "2019-02-21T13:30:04.340Z"
  }],
  "total": 14,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 2,
  "lastModified": "2019-02-21T13:30:04.340Z"
}
```

## Feature

`Feature` A representation of geographical feature of interest(i.e mapped physical
element with their attributes in landscape e.g. administrative boundaries, roads, buildings etc)
both natural and man made used in emergency(or disaster) management(or event).

### Feature Schema

`Feature` have the following attributes:

<br />

|   Name    |  Type  |                                                Description                                                |
| :-------: | :----: | :-------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature.                                |
|   type    | String |                                     Human readable type of a feature.                                     |
|   name    | Object |                             Human-translatable-readable name for the feature.                             |
| geometry  | Object |                                A geo-geometry representation of a feature                                 |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was updated. |

### Create Feature

To create a new feature, send a `POST` request to `https://api.ewea.io/v1/predefines/features`. The following attributes are supported:

<br/>

|   Name   |  Type  |                    Description                    | Required |
| :------: | :----: | :-----------------------------------------------: | :------: |
|   type   | String |         Human readable type of a feature.         |   true   |
|   name   | Object | Human-translatable-readable name for the feature. |   true   |
| geometry | Object |    A geo-geometry representation of a feature     |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/features \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "type": "Hospital"
    "name": { "en": "Mbezi Health Centre" },
    "geometry": {
                "type": "Point",
                "coordinates": [39.2155451,-6.7269984]
        }

  }'
```

The response will be a `JSON object` with the standard feature attributes:

<br/>

|   Name    |  Type  |                                                Description                                                |
| :-------: | :----: | :-------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature.                                |
|   type    | String |                                     Human readable type of a feature.                                     |
|   name    | Object |                             Human-translatable-readable name for the feature.                             |
| geometry  | Object |                                A geo-geometry representation of a feature                                 |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "type": "Hospital",
  "name": { "en": "Mbezi Health Centre" },
  "geometry": {
            "type": "Point",
            "coordinates": [39.2155451,-6.7269984]
    }
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Retrieve Feature

To get a feature, send a `GET` request to `https://api.ewea.io/v1/predefines/features/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/features/5ddbbc871283e3131b2d41f4 \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard feature attributes:

<br/>

|   Name    |  Type  |                                                Description                                                |
| :-------: | :----: | :-------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature.                                |
|   type    | String |                                     Human readable type of a feature.                                     |
|   name    | Object |                             Human-translatable-readable name for the feature.                             |
| geometry  | Object |                                A geo-geometry representation of a feature                                 |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4",
  "type": "Hospital"
  "name": { "en": "Mbezi Health Centre" },
  "geometry": {
            "type": "Point",
            "coordinates": [39.2155451,-6.7269984]
    },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Update Feature

To update existing feature, send a `PATCH` request to `https://api.ewea.io/v1/predefines/features/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                    Description                    | Required |
| :---------: | :----: | :-----------------------------------------------: | :------: |
|    type     | String |         Human readable type of a feature.         |   true   |
|    name     | Object | Human-translatable-readable name for the feature. |   true   |
| description | Object |    A geo-geometry representation of a feature     |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/features/5ddbbc871283e3131b2d41f4 \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
    "type": "Hospital",
    "name": { "en": "Mbezi Health Centre" },
    "geometry": {
            "type": "Point",
            "coordinates": [39.2155451,-6.7269984]
    },
  }'
```

The response will be a `JSON object` with the standard feature attributes:

<br/>

|   Name    |  Type  |                                                Description                                                |
| :-------: | :----: | :-------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature.                                |
|   type    | String |                                     Human readable type of a feature.                                     |
|   name    | Object |                             Human-translatable-readable name for the feature.                             |
| geometry  | Object |                                A geo-geometry representation of a feature                                 |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4"
  "type": "Hospital",
  "name": { "en": "Mbezi Health Centre" },
  "geometry": {
            "type": "Point",
            "coordinates": [39.2155451,-6.7269984]
    },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### Delete Feature

To delete existing feature, send a `DELETE` request to `https://api.ewea.io/v1/predefines/features/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/features/5c6ea7dae1dc700018aac95b \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard feature attributes:

<br/>

|   Name    |  Type  |                                                Description                                                |
| :-------: | :----: | :-------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature.                                |
|   type    | String |                                     Human readable type of a feature.                                     |
|   name    | Object |                             Human-translatable-readable name for the feature.                             |
| geometry  | Object |                                A geo-geometry representation of a feature                                 |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5ddbbc871283e3131b2d41f4"
  "type": "Hospital",
  "name": { "en": "Mbezi Health Centre" },
  "geometry": {
            "type": "Point",
            "coordinates": [39.2155451,-6.7269984]
    },
  "updatedAt": "2019-02-21T13:45:04.340Z",
  "createdAt": "2019-02-21T13:45:04.340Z"
}
```

### List All Features

To list all features, send a `GET` request to `https://api.ewea.io/v1/predefines/`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/features \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of eventfunction with the standard feature attributes:

<br/>

|   Name    |  Type  |                                                Description                                                |
| :-------: | :----: | :-------------------------------------------------------------------------------------------------------: |
|   \_id    | String |                               Unique universal identifier of this feature.                                |
|   name    | Object |                             Human-translatable-readable name for the feature.                             |
|   type    | String |                                     Human readable type of a feature.                                     |
| geometry  | Object |                                A geo-geometry representation of a feature                                 |
| createdAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was created. |
| updatedAt | String | A time value given in ISO8601 combined date and time format that represents when the feature was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
  "_id": "5ddbbc871283e3131b2d41f4",
  "type": "Hospital",
  "name": { "en": "Mbezi Health Centre" },
  "geometry": {
            "type": "Point",
            "coordinates": [39.2155451,-6.7269984]
    }
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

## EventIndicator

`EventIndicator` Define measure used to assess need, effects, situation and characteristics of an event.

### EventIndicator Schema

`EventIndicator` have the following attributes:

<br />

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event indicator.                                |
|    name     | Object |                             Human-translatable-readable name for the event indicator.                             |
| description | Object |                         Human-translatable-readable description for the event indicator.                          |
|  createdAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was created. |
|  updatedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was updated. |

### Create EventIndicator

To create a new event indicator, send a `POST` request to `https://api.ewea.io/v1/predefines/eventindicators`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                            | Required |
| :---------: | :----: | :--------------------------------------------------------------: | :------: |
|    name     | Object |    Human-translatable-readable name for the event indicator.     |   true   |
| description | Object | Human-translatable-readable description for the event indicator. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventindicators \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings":{
		"name":{ "en":"Damage and Lose"},
		"description":{ "en":"Damage and Lose"}
	}
}'
```

The response will be a `JSON object` with the standard event indicator attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event indicator.                                |
|    name     | Object |                             Human-translatable-readable name for the event indicator.                             |
| description | Object |                         Human-translatable-readable description for the event indicator.                          |
|  createdAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was created. |
|  updatedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Damage and Lose" },
    "description": { "en": "Damage and Lose" }
  },
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z"
}
```

### Retrieve EventIndicator

To get a event indicator, send a `GET` request to `https://api.ewea.io/v1/predefines/eventindicators/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventindicators/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event indicator attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event indicator.                                |
|    name     | Object |                             Human-translatable-readable name for the event indicator.                             |
| description | Object |                         Human-translatable-readable description for the event indicator.                          |
|  createdAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was created. |
|  updatedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Damage and Lose" },
    "description": { "en": "Damage and Lose" }
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z"
}
```

### Update EventIndicator

To update existing event indicator, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventindicators/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                            | Required |
| :---------: | :----: | :--------------------------------------------------------------: | :------: |
|    name     | Object |    Human-translatable-readable name for the event indicator.     |   true   |
| description | Object | Human-translatable-readable description for the event indicator. |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventindicators/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings":{
		"name":{ "en":"Damage and Lose"},
		"description":{ "en":"Damage and Loses."}
	}
}'
```

The response will be a `JSON object` with the standard event indicator attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event indicator.                                |
|    name     | Object |                             Human-translatable-readable name for the event indicator.                             |
| description | Object |                         Human-translatable-readable description for the event indicator.                          |
|  createdAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was created. |
|  updatedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Damage and Lose" },
    "description": { "en": "Damage and Loses." },
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z"
}
```

### Delete EventIndicator

To delete existing event indicator, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventindicator/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventindicators/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event indicator attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event indicator.                                |
|    name     | Object |                             Human-translatable-readable name for the event indicator.                             |
| description | Object |                         Human-translatable-readable description for the event indicator.                          |
|  createdAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was created. |
|  updatedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was updated. |
|  deletedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Damage and Lose" },
    "description": { "en": "Damage and Loses." },
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z",
  "deletedAt": "2019-12-18T17:12:39.505Z",
}
```

### List All EventIndicator

To list all event indicators, send a `GET` request to `https://api.ewea.io/v1/predefines/eventindicators`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventindicators \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of indicators with the standard event indicators attributes:

<br/>

|    Name     |  Type  |                                                    Description                                                    |
| :---------: | :----: | :---------------------------------------------------------------------------------------------------------------: |
|    \_id     | String |                               Unique universal identifier of this event indicator.                                |
|    name     | Object |                             Human-translatable-readable name for the event indicator.                             |
| description | Object |                         Human-translatable-readable description for the event indicator.                          |
|  createdAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was created. |
|  updatedAt  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event indicator was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Damage and Lose" },
    "description": { "en": "Damage and Loses." },
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z"
  }],
  "total": 14,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 2,
  "lastModified": "2019-12-18T15:43:22.874Z",
  "hasMore": true
}
```

## EventQuestion

`EventQuestion` A representation of question that is used to assess need, situation and characteristics of disaster(or emergency) event.

### EventQuestion Schema

`EventQuestion` have the following attributes:

<br />

|                    Name                     |  Type  |                                                   Description                                                    |
| :-----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                               Unique universal identifier of this event question.                                |
|                    name                     | Object |                             Human-translatable-readable name for the event question.                             |
|                 description                 | Object |                         Human-translatable-readable description for the event question.                          |
| [indicator](#core-resources-eventindicator) | Object |                                        Indicator which a question assess.                                        |
|        [unit](#core-resources-unit)         | Object |                 Define unit of measure of an event need, effects, situation or characteristics.                  |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was updated. |

### Create EventQuestion

To create a new event question, send a `POST` request to `https://api.ewea.io/v1/predefines/eventquestions`. The following attributes are supported:

<br/>

|                    Name                     |  Type  |                                   Description                                   | Required |
| :-----------------------------------------: | :----: | :-----------------------------------------------------------------------------: | :------: |
|                    name                     | Object |            Human-translatable-readable name for the event question.             |   true   |
|                 description                 | Object |         Human-translatable-readable description for the event question.         |  false   |
| [indicator](#core-resources-eventindicator) | Object |                       Indicator which a question assess.                        |   true   |
|        [unit](#core-resources-unit)         | Object | Define unit of measure of an event need, effects, situation or characteristics. |   true   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/eventquestions \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings": { "name": { "en": "Deaths" }},
  "relations": {
    "indicator": "5e1c39082e249a6793589b10",
    "unit": "5e1c392f2e249a6793589b11"
  }
}'
```

The response will be a `JSON object` with the standard event question attributes:

<br/>

|                    Name                     |  Type  |                                                   Description                                                    |
| :-----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                               Unique universal identifier of this event question.                                |
|                    name                     | Object |                             Human-translatable-readable name for the event question.                             |
|                 description                 | Object |                         Human-translatable-readable description for the event question.                          |
| [indicator](#core-resources-eventindicator) | Object |                                        Indicator which a question assess.                                        |
|        [unit](#core-resources-unit)         | Object |                 Define unit of measure of an event need, effects, situation or characteristics.                  |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Deaths" },
    "description": { "en": "Deaths" }
  },
  "indicator":{ "strings":{ "name":{ "en":"Damages and Losses"} }},
  "unit":{ "strings":{ "name":{ "en":"Person"} }}
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z"
}
```

### Retrieve EventQuestion

To get a event question, send a `GET` request to `https://api.ewea.io/v1/predefines/eventquestions/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventquestions/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event question attributes:

<br/>

|                    Name                     |  Type  |                                                   Description                                                    |
| :-----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                               Unique universal identifier of this event question.                                |
|                    name                     | Object |                             Human-translatable-readable name for the event question.                             |
|                 description                 | Object |                         Human-translatable-readable description for the event question.                          |
| [indicator](#core-resources-eventindicator) | Object |                                        Indicator which a question assess.                                        |
|        [unit](#core-resources-unit)         | Object |                 Define unit of measure of an event need, effects, situation or characteristics.                  |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Deaths" },
    "description": { "en": "Deaths" }
  },
  "indicator":{ "strings":{ "name":{ "en":"Damages and Losses"} }},
  "unit":{ "strings":{ "name":{ "en":"Person"} }}
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z"
}
```

### Update EventQuestion

To update existing event question, send a `PATCH` request to `https://api.ewea.io/v1/predefines/eventquestions/:id`. The following attributes are supported:

<br/>

|    Name     |  Type  |                           Description                           | Required |
| :---------: | :----: | :-------------------------------------------------------------: | :------: |
|    name     | Object |    Human-translatable-readable name for the event question.     |   true   |
| description | Object | Human-translatable-readable description for the event question. |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/eventquestions/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings":{
		"name":{ "en":"Affected"},
		"description":{ "en":"Affected"}
	}
}'
```

The response will be a `JSON object` with the standard event question attributes:

<br/>

|                    Name                     |  Type  |                                                   Description                                                    |
| :-----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                               Unique universal identifier of this event question.                                |
|                    name                     | Object |                             Human-translatable-readable name for the event question.                             |
|                 description                 | Object |                         Human-translatable-readable description for the event question.                          |
| [indicator](#core-resources-eventindicator) | Object |                                        Indicator which a question assess.                                        |
|        [unit](#core-resources-unit)         | Object |                 Define unit of measure of an event need, effects, situation or characteristics.                  |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Affected" },
    "description": { "en": "Affected" }
  },
  "indicator":{ "strings":{ "name":{ "en":"Damages and Losses"} }},
  "unit":{ "strings":{ "name":{ "en":"Person"} }}
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z"
}
```

### Delete EventQuestion

To delete existing event question, send a `DELETE` request to `https://api.ewea.io/v1/predefines/eventquestion/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/eventquestions/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event question attributes:

<br/>

|                    Name                     |  Type  |                                                   Description                                                    |
| :-----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                               Unique universal identifier of this event question.                                |
|                    name                     | Object |                             Human-translatable-readable name for the event question.                             |
|                 description                 | Object |                         Human-translatable-readable description for the event question.                          |
| [indicator](#core-resources-eventindicator) | Object |                                        Indicator which a question assess.                                        |
|        [unit](#core-resources-unit)         | Object |                 Define unit of measure of an event need, effects, situation or characteristics.                  |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was updated. |
|                  deletedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Affected" },
    "description": { "en": "Affected" }
  },
  "indicator":{ "strings":{ "name":{ "en":"Damages and Losses"} }},
  "unit":{ "strings":{ "name":{ "en":"Person"} }}
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z",
  "deletedAt": "2019-12-18T18:12:39.505Z",
}
```

### List All EventQuestion

To list all event question, send a `GET` request to `https://api.ewea.io/v1/predefines/eventquetions`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/eventquestions \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of question with the standard event question attributes:

<br/>

|                    Name                     |  Type  |                                                   Description                                                    |
| :-----------------------------------------: | :----: | :--------------------------------------------------------------------------------------------------------------: |
|                    \_id                     | String |                               Unique universal identifier of this event question.                                |
|                    name                     | Object |                             Human-translatable-readable name for the event question.                             |
|                 description                 | Object |                         Human-translatable-readable description for the event question.                          |
| [indicator](#core-resources-eventindicator) | Object |                                        Indicator which a question assess.                                        |
|        [unit](#core-resources-unit)         | Object |                 Define unit of measure of an event need, effects, situation or characteristics.                  |
|                  createdAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was created. |
|                  updatedAt                  |  Date  | A time value given in ISO8601 combined date and time format that represents when the event question was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Affected" },
    "description": { "en": "Affected" }
  },
  "indicator":{ "strings":{ "name":{ "en":"Damages and Losses"} }},
  "unit":{ "strings":{ "name":{ "en":"Person"} }}
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z"
  }],
  "total": 14,
  "size": 10,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 2,
  "lastModified": "2019-12-19T15:43:22.874Z",
  "hasMore": true
}
```

## Unit

`Unit` Define unit of measure of an event need, effects, situation or characteristics.

### Unit Schema

`Unit` have the following attributes:

<br />

|     Name     |  Type  |                                              Description                                               |
| :----------: | :----: | :----------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this unit.                                |
|     name     | Object |                             Human-translatable-readable name for the unit.                             |
| abbreviation | Object |                         Human-translatable-readable abbreviation for the unit.                         |
|  createdAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was created. |
|  updatedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was updated. |

### Create Unit

To create a new unit, send a `POST` request to `https://api.ewea.io/v1/predefines/units`. The following attributes are supported:

<br/>

|     Name     |  Type  |                      Description                       | Required |
| :----------: | :----: | :----------------------------------------------------: | :------: |
|     name     | Object |     Human-translatable-readable name for the unit.     |   true   |
| abbreviation | Object | Human-translatable-readable abbreviation for the unit. |  false   |

> Example Request

```curl
curl --request POST \
--url https://api.ewea.io/v1/predefines/unit \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings":{
		"name":{ "en":"Person"},
	}
}'
```

The response will be a `JSON object` with the standard unit attributes:

<br/>

|     Name     |  Type  |                                              Description                                               |
| :----------: | :----: | :----------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this unit.                                |
|     name     | Object |                             Human-translatable-readable name for the unit.                             |
| abbreviation | Object |                         Human-translatable-readable abbreviation for the unit.                         |
|  createdAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was created. |
|  updatedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was updated. |

> Example Response

```curl
HTTP/1.1 201 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Person" },
    "abbreviation": { "en": "P" }
  },
  "updatedAt": "2019-12-18T15:12:39.505Z",
  "createdAt": "2019-12-18T15:12:39.505Z"
}
```

### Retrieve Unit

To get a unit, send a `GET` request to `https://api.ewea.io/v1/predefines/units/:id`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/units/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard event indicator attributes:

<br/>

|     Name     |  Type  |                                              Description                                               |
| :----------: | :----: | :----------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this unit.                                |
|     name     | Object |                             Human-translatable-readable name for the unit.                             |
| abbreviation | Object |                         Human-translatable-readable abbreviation for the unit.                         |
|  createdAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was created. |
|  updatedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Person" },
    "abbreviation": { "en": "P" }
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z"
}
```

### Update Unit

To update existing unit, send a `PATCH` request to `https://api.ewea.io/v1/predefines/units/:id`. The following attributes are supported:

<br/>

|     Name     |  Type  |                      Description                       | Required |
| :----------: | :----: | :----------------------------------------------------: | :------: |
|     name     | Object |     Human-translatable-readable name for the unit.     |   true   |
| abbreviation | Object | Human-translatable-readable abbreviation for the unit. |  false   |

> Example Request

```curl
curl --request PATCH \
--url https://api.ewea.io/v1/predefines/units/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <apiKey>' \
--data '{
  "strings":{
		"name":{ "en":"Person."},
		"abbreviation":{ "en":"P"}
	}
}'
```

The response will be a `JSON object` with the standard unit attributes:

<br/>

|     Name     |  Type  |                                              Description                                               |
| :----------: | :----: | :----------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this unit.                                |
|     name     | Object |                             Human-translatable-readable name for the unit.                             |
| abbreviation | Object |                         Human-translatable-readable abbreviation for the unit.                         |
|  createdAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was created. |
|  updatedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was updated. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Person." },
    "abbreviation": { "en": "P" },
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z"
}
```

### Delete Unit

To delete existing unit, send a `DELETE` request to `https://api.ewea.io/v1/predefines/units/:id`.

> Example Request

```curl
curl --request DELETE \
--url https://api.ewea.io/v1/predefines/units/5dfa41e75b0afc0fd91ca92d \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with the standard unit attributes:

<br/>

|     Name     |  Type  |                                              Description                                               |
| :----------: | :----: | :----------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this unit.                                |
|     name     | Object |                             Human-translatable-readable name for the unit.                             |
| abbreviation | Object |                         Human-translatable-readable abbreviation for the unit.                         |
|  createdAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was created. |
|  updatedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was updated. |
|  deletedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was deleted. |

> Example Response

```curl
HTTP/1.1 200 Success
{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "Persons." },
    "abbreviation": { "en": "P" },
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z",
  "deletedAt": "2019-12-18T17:12:39.505Z",
}
```

### List All Unit

To list all unit, send a `GET` request to `https://api.ewea.io/v1/predefines/units`.

> Example Request

```curl
curl --request GET \
--url https://api.ewea.io/v1/predefines/units \
--header 'Accept: application/json' \
--header 'Authorization: Bearer <apiKey>'
```

The response will be a `JSON object` with a `data key`. The values in the `data key` are set of units with the standard units attributes:

<br/>

|     Name     |  Type  |                                              Description                                               |
| :----------: | :----: | :----------------------------------------------------------------------------------------------------: |
|     \_id     | String |                               Unique universal identifier of this unit.                                |
|     name     | Object |                             Human-translatable-readable name for the unit.                             |
| abbreviation | Object |                         Human-translatable-readable abbreviation for the unit.                         |
|  createdAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was created. |
|  updatedAt   |  Date  | A time value given in ISO8601 combined date and time format that represents when the unit was updated. |

> Example Response:

```curl
HTTP/1.1 200 Success
{
  "data": [{
  "_id": "5dfa41e75b0afc0fd91ca92d",
  "strings": {
    "name": { "en": "person" },
    "abbreviation": { "en": "P" },
  },
  "updatedAt": "2019-12-18T16:12:39.505Z",
  "createdAt": "2019-12-18T16:12:39.505Z"
  }],
  "total": 6,
  "size": 6,
  "limit": 10,
  "skip": 0,
  "page": 1,
  "pages": 1,
  "lastModified": "2019-12-20T15:43:22.874Z",
  "hasMore": true
}
```

# Acknowledgements

© 2019, EWEA. Released under the <a href="https://github.com/CodeTanzania/ewea/blob/develop/LICENSE" target="_blank">MIT License</a>.
