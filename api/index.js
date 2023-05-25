const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express')
const app = express();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "mongol_aylal_db",
});


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WebAPI',
      version: '1.0.0'
    },
  },
  apis: ['./index.js']
}

const openapiSpec = swaggerJSDoc(options);

const UIoptions = {
  explorer: true
}

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpec, UIoptions));

/** 
 * @openapi
 * /travels:
 *  get:
 *    description: Get all travels
 *    responses:
 *      200:
*         description: Returns all travels data
 *      500:
 *        description: error...
 *      404:
 *        description: Travels not found
*/
app.get("/travels", async (req, res) => {
  try {
    const allTravels = await pool.query("SELECT * FROM travels");
    res.json(allTravels.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/** 
 * @openapi
 * /travels/special:
 *  get:
 *    description: Get all travels with type of special
 *    summary: Get all travels with type of special
 *    responses:
 *      200:
*         description: Returns all travels data with type of special
 *      500:
 *        description: error...
 *      404:
 *        description: Travels not found
*/
app.get("/travels/special", async (req, res) => {
  try {
    const t_type = "special";
    const query = "SELECT * FROM travels WHERE t_type = $1";
    const result = await pool.query(query, [t_type]);

    if (result.rows.length > 0) {
      const specialTravels = result.rows;
      res.json(specialTravels);
    } else {
      res.status(404).json({ message: "Travels not found" });
    }

  } catch (err) {
    console.error(err.message);
  }
});

/** 
 * @openapi
 * /travels/special:
 *  get:
 *    description: Get all upcoming travels
 *    summary: Get all upcoming travels
 *    responses:
 *      200:
*         description: Returns all upcoming travels
 *      500:
 *        description: error...
 *      404:
 *        description: Travels not found
*/
app.get("/travels/upcoming", async (req, res) => {
  try {
    const dateNow = new Date();
    const futureDate = new Date();

    futureDate.setDate(dateNow.getDate() + 30);

    const query = "SELECT * FROM travels WHERE startDate BETWEEN $1 AND $2";
    const result = await pool.query(query, [dateNow, futureDate]);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/** 
 * @openapi
 * /travels/{id}:
 *  get:
 *    summary: Get travel data by id
 *    parameters:
 *     - in: path
 *       name: id
 *       description: travel id
 *       required: true
 *       type: integer
 *    responses:
 *      200:
*         description: Returns travel data by id
 *      500:
 *        description: error...
 *      404:
 *        description: Travel not found
*/
app.get("/travels/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM travels WHERE t_id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      const travelData = result.rows[0];
      res.json(travelData);
    } else {
      res.status(404).json({ message: "Travel not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /blogs:
 *  get:
 *    summary: Get all blogs data
 *    responses:
 *      200:
*         description: Returns all blogs data
 *      500:
 *        description: error...
 *      404:
 *        description: Blogs not found
*/
app.get("/blogs", async (req, res) => {
  try {
    const allBlogs = await pool.query("SELECT * FROM blogs");
    res.json(allBlogs.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /blogs/{id}:
 *  get:
 *    summary: Get blog data by id
 *    parameters:
 *     - in: path
 *       name: id
 *       description: blog id
 *       required: true
 *       type: integer
 *    responses:
 *      200:
*         description: Returns blog data by id
 *      500:
 *        description: error...
 *      404:
 *        description: Blog not found
*/
app.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM blogs WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      const blogData = result.rows[0];
      res.json(blogData);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /reviews:
 *  get:
 *    summary: Get all reviews
 *    responses:
 *      200:
*         description: Returns all reviews
 *      500:
 *        description: error...
 *      404:
 *        description: Reviews not found
*/
app.get("/reviews", async (req, res) => {
  try {
    const allBlogs = await pool.query("SELECT * FROM reviews");
    res.json(allBlogs.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /reviews/{id}:
 *  get:
 *    summary: Get review by id
 *    parameters:
 *     - in: path
 *       name: id
 *       description: review id
 *       required: true
 *       type: integer
 *    responses:
 *      200:
*         description: Returns review by id
 *      500:
 *        description: error...
 *      404:
 *        description: Review not found
*/
app.get("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM reviews WHERE t_id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      const reviewData = result.rows[0];
      res.json(reviewData);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /bookings:
 *  get:
 *    summary: Get all bookings
 *    responses:
 *      200:
*         description: Returns all bookings
 *      500:
 *        description: error...
 *      404:
 *        description: Bookings not found
*/
app.get("/bookings", async (req, res) => {
  try {
    const allBookings = await pool.query("SELECT * FROM bookings");
    res.json(allBookings.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /bookings/{id}:
 *  get:
 *    summary: Get booking by id
 *    parameters:
 *     - in: path
 *       name: id
 *       description: booking id
 *       required: true
 *       type: integer
 *    responses:
 *      200:
*         description: Returns booking by id
 *      500:
 *        description: error...
 *      404:
 *        description: Booking not found
*/
app.get("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM bookings WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      const booking = result.rows[0];
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

/** 
 * @openapi
 * /bookings:
 *  post:
 *    summary: Creates a new booking
 *    requestBody:
 *        description: Request body on bookings
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                lastName:
 *                  type: string
 *                  description: lastname
 *                firstName:
 *                  type: string
 *                  description: firstName
 *                phoneNumber:
 *                  type: string
 *                  description: phone number
 *                mail:
 *                  type: string
 *                  description: mail
 *                t_type:
 *                  type: string
 *                  description: travel type
 *                t_id:
 *                  type: integer
 *                  description: travel id
 *                numberOfTravelers:
 *                  type: integer
 *                  description: number of travelers
 *                additionalInfo:
 *                  type: string
 *                  description: additional information
 *                created_at:
 *                  type: string
 *                  description: created at
 *                status:
 *                  type: string
 *                  description: status
 * 
 *    responses:
 *      201:
 *         description: Successfully created a new booking.
 *      500:
 *        description: error...
 *      412:
 *        description: Request body is not valid.
 *      422:
 *        description: Already exist or has an error.
*/
app.post("/bookings", async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      phoneNumber,
      mail,
      t_type,
      t_id,
      numberOfTravelers,
      additionalInfo,
      created_at,
      status,
    } = req.body;

    const query = `INSERT INTO bookings (lastName, firstName, phoneNumber, mail, t_type, t_id, numberOfTravelers, additionalInfo, created_at, status)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                   RETURNING id`;

    const values = [
      lastName,
      firstName,
      phoneNumber,
      mail,
      t_type,
      t_id,
      numberOfTravelers,
      additionalInfo,
      created_at,
      status,
    ];

    const result = await pool.query(query, values);
    const insertedId = result.rows[0].id;

    res.status(201).json({ message: "Booking order created", insertedId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send(
    "Веб програмчлал хичээлийн хүрээнд хийж буй WEB API даалгаврын эхлэх хэсэг."
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
