import { Router } from 'express';
import multer from 'multer';

const router = Router();

// Configure multer for handling FormData
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory for inspection
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
});

// Simple endpoint for testing form data without files
router.post('/test_form', (req, res) => {
    console.log('=== SIMPLE FORM DATA RECEIVED ===');
    console.log('Timestamp:', new Date().toISOString());

    // Log headers
    console.log('\n--- HEADERS ---');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Content-Length:', req.headers['content-length']);

    // Log form fields
    console.log('\n--- FORM FIELDS ---');
    if (req.body && Object.keys(req.body).length > 0) {
        Object.keys(req.body).forEach(key => {
            console.log(`${key}:`, req.body[key]);
        });
    } else {
        console.log('No form fields found');
    }

    console.log('\n=== END SIMPLE FORM DATA LOG ===\n');

    res.status(200).json({
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        status: 'success',
        receivedData: {
            fields: req.body,
            totalFields: Object.keys(req.body || {}).length
        }
    });
});

// Handle FormData with potential file uploads
router.post('/submit_interview', upload.any(), (req, res) => {
    console.log('=== FORM DATA RECEIVED ===');
    console.log('Timestamp:', new Date().toISOString());

    // Log headers
    console.log('\n--- HEADERS ---');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Content-Length:', req.headers['content-length']);
    console.log('User-Agent:', req.headers['user-agent']);

    // Log form fields
    console.log('\n--- FORM FIELDS ---');
    if (req.body && Object.keys(req.body).length > 0) {
        Object.keys(req.body).forEach(key => {
            console.log(`${key}:`, req.body[key]);
        });
    } else {
        console.log('No form fields found');
    }

    // Log files
    console.log('\n--- FILES ---');
    if (req.files && req.files.length > 0) {
        req.files.forEach((file, index) => {
            console.log(`File ${index + 1}:`);
            console.log(`  Field Name: ${file.fieldname}`);
            console.log(`  Original Name: ${file.originalname}`);
            console.log(`  MIME Type: ${file.mimetype}`);
            console.log(`  Size: ${file.size} bytes`);
            console.log(`  Buffer Length: ${file.buffer ? file.buffer.length : 'No buffer'}`);
        });
    } else {
        console.log('No files found');
    }

    // Log raw body for debugging
    console.log('\n--- RAW BODY ---');
    console.log('Body type:', typeof req.body);
    console.log('Body keys:', Object.keys(req.body || {}));

    // Log query parameters
    console.log('\n--- QUERY PARAMETERS ---');
    if (req.query && Object.keys(req.query).length > 0) {
        Object.keys(req.query).forEach(key => {
            console.log(`${key}:`, req.query[key]);
        });
    } else {
        console.log('No query parameters');
    }

    console.log('\n=== END FORM DATA LOG ===\n');

    res.status(200).json({
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        status: 'success',
        receivedData: {
            fields: req.body,
            files: req.files ? req.files.map(file => ({
                fieldname: file.fieldname,
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            })) : [],
            totalFiles: req.files ? req.files.length : 0
        }
    });
});

export default router;