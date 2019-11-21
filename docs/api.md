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

| Name  |  Type  |                      Description                      | Required |
| :---: | :----: | :---------------------------------------------------: | :------: |
| name  | Object | Human-translatable-readable name for the event group. |

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

| Name  |  Type  |                     Description                      | Required |
| :---: | :----: | :--------------------------------------------------: | :------: |
| name  | Object | Human-translatable-readable name for the event type. |

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

> Example Request

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

> TODO

## EventCertainty

> TODO

## EventFunction

> TODO

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

# Acknowledgements

© 2019, EWEA. Released under the <a href="https://github.com/CodeTanzania/ewea/blob/develop/LICENSE" target="_blank">MIT License</a>.
