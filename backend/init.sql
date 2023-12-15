CREATE DATABASE IF NOT EXISTS pubplus ;

USE pubplus;

CREATE TABLE pubplus.users (
    id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(200),
    status ENUM('Working', 'Working Remotely', 'On Vacation', 'Business Trip')
);

INSERT INTO `pubplus`.users (id, first_name, last_name, username, password, status)
VALUES
(1, 'John', 'Doe', 'john.doe', '$2b$10$uDBYuqOo8ycVW9ScMeIV1efQq0Tw0a84NghZYBLs6xXZmPO8ssW4.', 'Working'),
(2, 'Jane', 'Smith', 'jane.smith', '$2b$10$s/ZYstw5/v4gu1FSQCOySORZSBZ2oeC/lPwMcyBb.FhRt8xcKdD/O', 'On Vacation'), 
(3, 'Bob', 'Johnson', 'bob.johnson', '$2b$10$O/TMXpAOYcyf2YJOfG12QeYgGryocDCv6.q/ztznGORzQLirWDWPK', 'Business Trip'), 
(4, 'Alice', 'Williams', 'alice.williams', '$2b$10$GGomDHziURFVk3ni0pnduet.Upc3dfyECybiDImTgsK/K.YSEnsTu', 'Working'), 
(5, 'Charlie', 'Brown', 'charlie.brown', '$2b$10$bGqLdrKjKOZF6N98v2jFl.wrQ.ZwDWmQsDVI18KcYVGKGE7e25.wS', 'On Vacation'),
(6, 'Eva', 'Davis', 'eva.davis', '$2b$10$zOgX4dx1SDgmjvb3if4nveyZ4uR8kIqpGwRivGBrR5yUAtbKSXriO', 'Business Trip'),
(7, 'David', 'Miller', 'david.miller', '$2b$10$lzoBpGi4OWi/PybBbPExCOPPip6RNRowlWMNu0FnLi.C/9CP9TK1m', 'Working'),
(8, 'Sophia', 'Anderson', 'sophia.anderson', '$2b$10$C/Ws3ailAJ3tQgOy3b5wEe6Odo4W7S0ayuCwti/H8HdA9JFqmqy3i', 'On Vacation')
