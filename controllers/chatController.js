const express = require("express");
const Chat = require("../models/chat.js");

const saveChats = async (req, res) => {
  const chat = req.params;
  try {
    // const chatSaved = await Chat.save(chat);
    console.log(chat);
    res.status(200).send("chatSaved");
  } catch (error) {
    res.send(error);
  }
};

const getChats = async (req, res) => {
  try {
    const getChats = await Chat.find();

    res.status(200).json(getChats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  saveChats,
  getChats,
};
