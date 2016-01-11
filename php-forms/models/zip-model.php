<?php

class Zips {
    protected $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function search($q) {
        $sql = 'select * from zips where zip=? or primary_city=?';
        $statement = $this->conn->prepare($sql);
        $success = $statement->execute(array($q, $q));
        if (!$success) {
            trigger_error($statement->errorInfo());
            return false;
        } else {
            return $statement->fetchAll();
        }
    }
}

?>