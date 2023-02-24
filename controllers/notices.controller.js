const { NotFound } = require("http-errors");
const service = require("../services/notices");
const categories = ["sell", "in-good-hands", "lost-found"];

const getNoticesByCategory = async (req, res, next) => {
  /*
  #swagger.tags = ['Notices']
  #swagger.summary = 'Get Notices by Category'
  #swagger.description = 'Get all notices by category'
  #swagger.parameters['category'] = {
    in: 'path',
    description: 'Category name',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
        description: 'Notices by category',
        content: {
           'application/json': {
            schema: { $ref: '#/definitions/noticesList' },
            example: [{
        "_id": "63f496899d811400fbd1aacc",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            },{
        "_id": "63f4969e9d811400fbd1aacf",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            }]
          }
        }
      }
  #swagger.responses[404] = {
        description: 'Notices not found for category',
        content: {
           'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notices not found for category'
            }
          }
        }
  }
    */

  const { category } = req.params;

  if (!categories.includes(category)) {
    return next();
  }
  try {
    const notices = await service.getNoticesByCategory(category);
    res.json(notices);
  } catch (error) {
    next(error);
  }
};

const getNoticeById = async (req, res, next) => {
  /*
  #swagger.tags = ['Notices']
  #swagger.summary = 'Get Notice by ID'
  #swagger.description = 'Returns a notice with the given ID'
  #swagger.responses[200] = {
        description: 'Notice by id',
        content: {
          'application/json': {
           schema: { $ref: '#/definitions/noticeById' },
           example: {
        "_id": "63f49f3f9d811400fbd1aad2",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            }
          }
        }
      }
  #swagger.responses[404] = {
    description: 'Notice not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notice not found'
            }
          }
        }
  }
    */
  const { noticeId } = req.params;
  try {
    const notice = await service.getNoticeById(noticeId);

    if (!notice) {
      throw NotFound(404);
    }
    res.json(notice);
  } catch (error) {
    next(error);
  }
};

const getFavoriteNotices = async (req, res, next) => {
  /*
#swagger.tags = ['Notices']
#swagger.summary = 'Get favorite notices'
#swagger.description = 'Get favorite notices of a user'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = { 
        description: 'User favorites notices list.',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticesList' },
            example: [{
        "_id": "63f496899d811400fbd1aacc",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            },{
        "_id": "63f4969e9d811400fbd1aacf",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            }]
          }
        } 
      }
#swagger.responses[404] = {
    description: 'Notices not found in favorite',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notices not found in favorite'
            }
          }
        }
  }
*/
  const { _id } = req.user;

  try {
    const favorites = await service.getFavoriteNotices(_id);
    if (!favorites) {
      throw NotFound(favorites);
    }
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

const addNoticeInFavorites = async (req, res, next) => {
  /*
#swagger.tags = ['Notices']
#swagger.summary = 'Add notice to user favorites'
#swagger.description = 'Add the notice with the given ID to the user favorites list.'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = {
  description: 'User favorites with the newly added notice.',
  schema: {
    $ref: '#/definitions/addFavoriteNotice'
  },
  example: {
  "user": {
    "email": "user.email@mail.com",
    "favorites": [
      "63f4ae01b692bc63eb7c2d48",
      "63f5238cb8c2f29e47d1bdb5",
      "63f5fc0baf1b6464dbc75f14",
      "63f5238cb8c2f29e47d1bdb5"
    ]
  }
}
}
#swagger.responses[409] = {
    description: 'Notice already in notices list',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notice already in notices list'
            }
          }
        }
  }
*/
  const { noticeId } = req.params;
  const { _id, favorites } = req.user;

  if (favorites.some(favorite => favorite._id.toString() === noticeId)) {
    res.status(409).json({ message: "This notice is already in favorites" });
  }
  try {
    const user = await service.addNoticeInFavorites(noticeId, _id);

    if (!user) {
      throw NotFound(404);
    }

    res.json({
      user: { email: user.email, favorites: user.favorites },
    });
  } catch (error) {
    next(error);
  }
};

const deleteNoticeFromFavorites = async (req, res, next) => {
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Delete a notice'
#swagger.description = 'Delete a notice with the given ID.'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = {
  description: 'Notice success deleted',
  schema: {
    $ref: '#/definitions/addFavoriteNotice'
  },
  example: {
  "user": {
    "email": "user.email@mail.com",
    "favorites": [
      "63f4ae01b692bc63eb7c2d48",
      "63f5238cb8c2f29e47d1bdb5",
      "63f5fc0baf1b6464dbc75f14",
      "63f5238cb8c2f29e47d1bdb5"
    ]
  }
}
} 
  #swagger.responses[409] = {
    description: 'This notice is not in favorites',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'This notice is not in favorites'
            }
          }
        }
  }
    #swagger.responses[404] = {
    description: 'Notice not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notice not found'
            }
          }
        }
  }
*/

  const { noticeId } = req.params;
  const { favorites, _id } = req.user;

  if (!favorites.some(favorite => favorite._id.toString() === noticeId)) {
    res.status(409).json({ message: "This notice is not in favorites" });
  }

  try {
    const user = await service.deleteNoticeFromFavorites(noticeId, _id);

    if (!user) {
      throw NotFound(404);
    }

    res.json({
      user: { email: user.email, favorites: user.favorites },
    });
  } catch (error) {
    next(error);
  }
};

const getMyNotices = async (req, res, next) => {
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Get all user notices'
#swagger.description = 'Return all notices created by user'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = {
        description: 'all user notices',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticesList' },
            example: [{
        "_id": "63f496899d811400fbd1aacc",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            },{
        "_id": "63f4969e9d811400fbd1aacf",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            }]
          }
        }
      }
  #swagger.responses[404] = {
    description: 'Notices not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notices not found'
            }
          }
        }
  }

*/

  const { _id } = req.user;

  try {
    const data = await service.getMyNotices(_id);

    if (!data) {
      throw NotFound(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const createNotice = async (req, res, next) => {
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Create a notice'
#swagger.description = 'Create a notice '
#swagger.consumes = ['multipart/form-data']

#swagger.security = [{"JWT": []}]

#swagger.parameters['category'] = {
    in: 'formData',
    description: 'The category of notice',
    required: true,
    type: 'string'
}
#swagger.parameters['title'] = {
    in: 'formData',
    description: 'The title of notice.',
    required: true,
    type: 'string'
}
#swagger.parameters['name'] = {
    in: 'formData',
    description: 'The name of notice.',
    required: true,
    type: 'string'
}
#swagger.parameters['birthday'] = {
    in: 'formData',
    description: 'birthday',
    required: true,
    type: 'string'
}
#swagger.parameters['breed'] = {
    in: 'formData',
    description: 'The image to upload.',
    required: true,
    type: 'string'
}
#swagger.parameters['gender'] = {
    in: 'formData',
    description: 'gender.',
    required: true,
    type: 'string'
}
#swagger.parameters['location'] = {
    in: 'formData',
    description: 'location.',
    required: true,
    type: 'string'
}
#swagger.parameters['price'] = {
    in: 'formData',
    description: 'price.',
    required: true,
    type: 'string'
}
#swagger.parameters['image'] = {
    in: 'formData',
    description: 'The image to upload.',
    required: true,
    type: 'file'
}
#swagger.parameters['comments'] = {
    in: 'formData',
    description: 'comments.',
    required: true,
    type: 'string'
}


 
  }
*/

  const owner = req.user._id;
  const data = req.file ? { image: req.file.path, ...req.body } : req.body;
  try {
    const result = await service.createNotice(data, owner);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteMyNotice = async (req, res, next) => {
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Delete a notice'
#swagger.description = 'Delete a notice with the given ID.'
#swagger.parameters['noticeId'] = { description: 'The ID of the notice to delete.', in: 'path', required: true, type: 'string' }
#swagger.security = [{"JWT": []}]
 #swagger.responses[200] = {
        description: 'Deleted notice by ID',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticeById' },
            example: {
        "_id": "63f49f3f9d811400fbd1aad2",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            }
          }
        }
      }
  #swagger.responses[404] = {
    description: 'Notice not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notice not found'
            }
          }
        }
  }
*/
  const { noticeId } = req.params;
  const { _id } = req.user;

  try {
    const result = await service.deleteMyNotice(noticeId, _id);

    if (!result) {
      throw NotFound(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavoriteNotices,
  createNotice,
  getMyNotices,
  deleteNoticeFromFavorites,
  deleteMyNotice,
  addNoticeInFavorites,
  getNoticesByCategory,
  getNoticeById,
};
