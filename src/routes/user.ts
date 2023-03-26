import { Router } from "express";
import { deleteUser, getUser, getUsers, getUserWithRole, postUser, putUser } from "../controllers/user";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      UpdateUser:
 *          type: object
 *          required:
 *              - id
 *              - firstname
 *              - lastname
 *              - username
 *              - email
 *              - phonenumber
 *          properties:
 *              id:
 *                  type: string
 *                  description: The user ID.
 *              firstname:
 *                  type: string
 *                  default: Aykut
 *              lastname:
 *                  type: string
 *                  default: Harmancı
 *              username:
 *                  type: string
 *                  default: Harmancı
 *              email:
 *                  type: string
 *                  default: aykuthrmnc@gmail.com
 *              phonenumber:
 *                  type: string
 *                  default: Harmancı
 */

/**
 * @swagger
 * /users:
 *   get:
 *      tags: [User]
 *      description: Returns all users
 *      responses:
 *          '200':
 *           description: A list of users.
 */
router.get("/", getUsers);
/**
 * @swagger
 * /users/withRole:
 *   get:
 *      tags: [User]
 *      description: Returns all users with role
 *      responses:
 *          '200':
 *              description: A list of users.
 */
router.get("/withRole", getUserWithRole);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *      tags: [User]
 *      summary: Kullanıcı bulma
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Kullanıcı ID.
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          '200':
 *              description: Kullanıcı bulundu.
 *          '404':
 *              description: Kullanıcı bulunamadı.
 *          '500':
 *              description: Sunucu hatası
 */
router.get("/:id", getUser);
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User]
 *     summary: Yeni bir kullanıcı oluşturur.
 *     description: Yeni bir kullanıcı oluşturmak için kullanılır.
 *     produces:
 *       - application/json
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/CreateUser'
 *     responses:
 *         200:
 *             description: Kullanıcı oluşturuldu.
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/CreateUser'
 *         500:
 *             description: Sunucu hatası
 */
router.post("/", postUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *      tags: [User]
 *      summary: Kullanıcı güncelleme
 *      description: Olan kullanıcıyı günceller.
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Kullanıcı ID.
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *                  examples:
 *                      deneme1:
 *                          value:
 *                              firstname: a
 *                              lastname: a
 *                              username: a
 *                              password: a
 *                              email: a
 *                              phonenumber: a
 *                      deneme2:
 *                          value:
 *                              firstname: b
 *                              lastname: b
 *                              username: b
 *                              password: b
 *                              email: b
 *                              phonenumber: b
 *      responses:
 *          '200':
 *              description: Kullanıcı güncellendi.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateUser'
 *          '404':
 *              description: Kullanıcı bulunamadı.
 *          '500':
 *              description: Sunucu hatası
 *      security:
 *          - api_key: []
 */

router.put("/:id", putUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *      tags: [User]
 *      summary: Kullanıcı silme
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Kullanıcı ID.
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          '200':
 *              description: Kullanıcı silindi.
 *          '404':
 *              description: Kullanıcı bulunamadı.
 *          '500':
 *              description: Sunucu hatası
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", deleteUser);

export default router;
