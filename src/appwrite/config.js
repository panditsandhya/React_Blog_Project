import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // slug is id here
  // Create Post

  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )
      
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      
    }

  }

  // Update all post
  async updatePost(slug, {title, content, featuredImage, status}){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
      
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      
    }
  }

  // Delete all post
  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
      
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false
      
    }
  }

  // single post
  async getPost(slug){
    try {
     return await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug
     )
      
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false
      
    }
  }

  // All post
  async getPosts(queries = [Query.equal("status", "active")] ){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      )
      
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false
      
    }
  }

  // File upload service

  async uploadFile(file){
    try {
      return await this.bucket.createFile (
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
      
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false
      
    }
  }

  // File delete service

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false
      
    }
  }

  // File preview service
  
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }





}

const service = new Service()

export default service