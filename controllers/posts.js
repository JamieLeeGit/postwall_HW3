const httpService = require('../service/http');
const Post = require('../models/post');

/**
 * 取得所有貼文 & 偷懶檢查 DB 所有資料用
 * @param {resquest} req 連線請求
 * @param {respones} res 回應結果
 */
const success = async function(req, res){
    const data = await Post.find();
    httpService.successHandle({req, res, data});
}

const posts = {
    /**
     * 讀取單一貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async readPostsOne(req, res, next){
        console.log('readPostsOne');

        try{
            // 取得貼文 id    
            const id = req.params.id;
            const data = await Post.findOne({ _id: id});

            if(data){
                httpService.successHandle({req, res, data});
            }else{
                httpService.errorHandle(req, res);
            }                
        }catch(err){
            httpService.errorHandle(req, res);
        }
    },
    /**
     * 讀取所有貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async readPostsAll(req, res, next){   
        console.log('readPostsAll');

        await success(req, res);
    },
    /**
     * 新增單筆貼文
     * @param {*} param0 
     */
    async createPostsOne(req, res, next){
        console.log('createPostsOne');
        
        try{
            const data = req.body;

            // 檢查所有必填欄位
            if(data.name && data.tags && data.type && data.content){
                const result = await Post.create
                (
                    {
                        name: data.name,
                        tags: data.tags,
                        type: data.type,
                        content: data.content,
                        image: data.image
                    }
                );

                await success(req, res);                 
            }else{                
                httpService.errorHandle(req, res);
            }                
        }catch(err){
            console.log(err);
            httpService.errorHandle(req, res);
        }
    },
    /**
     * 給 user 修改單一貼文內容用(content、tags)
     * @param {*} param0 
     */
    async updatePostsOne(req, res, next){
        console.log('updatePostsOne');

        try{     
            const id = req.params.id;           
            const data = req.body;
            console.log(req.body);
            if(data.content){
                const result = await Post.findByIdAndUpdate(
                    id, 
                    {
                        content: data.content,
                        tags: data.tags
                    },
                    { runValidators : true }
                );
                
                await success(req, res);  
                console.log('success');
            }else{
                httpService.errorHandle(req, res);
            }                   
        }catch(err){
            console.log(err);
            httpService.errorHandle(req, res);
        }
    },
    /**
     * 刪除單筆貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async deletePostsOne(req, res, next){
        console.log('deletePostsOne');

        try{
            const id = req.params.id;
            const result = await Post.findByIdAndDelete(id);

            if(result){                
                await success(req, res); 
            }else{
                httpService.errorHandle(req, res);
            }  
        }catch(err){
            httpService.errorHandle(req, res);
        }      
    },
    /**
     * 刪除全部貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async deletePostsAll(req, res, next){
        console.log('deletePostsAll');

        const result = await Post.deleteMany({});
        await success(req, res); 
    },
}

module.exports = posts;