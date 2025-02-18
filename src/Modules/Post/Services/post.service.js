import { Post, User } from "../../../DB/models/index.js"
import { pagination } from "../../../utils/pagination.utils.js"


export const createPost = async (req, res, next) => {
    const {_id} = req.loggedInUser
    const { title , desc  , allowedComments  , tags} = req.body
    const {files} = req

    if(tags){
        const users  = await User.find({ _id:{ $in: tags}})
        if(users.length != tags.length){
            return res.status(404).json({ message: 'User not found' })
        }
    }

    const postObject =  {
        title,
        description:desc,
        ownerId:_id,
        allowedComments,
        tags
    }

    const post = await Post.create(postObject)

    return res.status(200).json({ message: 'Post created successfully'  , post})
}

export const listPosts = async (req, res, next) => {
  // page , limit
  const {page , limit=2} = req.query

  // limit skip
  // const skip = (page - 1) * limit
  // const posts = await Post.find({}).limit(limit).skip(skip).sort({createdAt:-1})
  // const totalPosts = await Post.countDocuments()

  // posts: [{}]
  // Redis
  const posts = await Post.paginate({allowedComments:true},{
    page, 
    limit,
    customLabels:{
      totalDocs:'totalPosts',
      docs:'posts',
      page:'currentPage',
      limit:"postsPerPage"
    },
    populate:{
      path:'ownerId',
      select:'username'
    },
    sort:{createdAt:-1}
  })
  return res.status(200).json({ message: 'Posts fetched successfully'  , posts })
}

/**
 * MongoDB hosted 
 * package.json
 * github 
 * host
 * vercel.json
 */