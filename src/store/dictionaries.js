import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { action, computed, makeObservable, observable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Dictionaries {
  dictionaries = [];

  constructor() {
    makeObservable(this, {
      dictionaries: observable,
      loadData: action,
      addDictionary: action,
      deleteDictionary: action,
      AddWord: action,
      DeleteWord: action,
      AddSynonym: action,
      EditSynonym: action,
      DeleteSynonym: action,
      countDictionaries: computed,
    });
  }

  loadData = async () => {
    // read data from the local storage
    const dataString = await AsyncStorage.getItem("dictionariesData");
    if (dataString) {
      this.dictionaries = JSON.parse(dataString);
    }
  };

  addDictionary = async (title) => {
    this.dictionaries = [
      ...this.dictionaries,
      {
        dictionaryName: title,
        dictionaryId: uuidv4(),
        learnWords: [],
      },
    ];

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  deleteDictionary = async (id) => {
    this.dictionaries = this.dictionaries.filter(
      (item) => item.dictionaryId !== id
    );

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  AddWord = async (newWord, newSynonym, selectedDictionaryId) => {
    let currentDictionary = this.dictionaries.find(
      (dictionary) => dictionary.dictionaryId === selectedDictionaryId
    );

    currentDictionary.learnWords.push({
      newWord: newWord,
      newWordId: uuidv4(),
      additionalWords: [
        { additionalWord: newSynonym, additionalWordId: uuidv4() },
      ],
    });

    let newDictionary = [...this.dictionaries];
    let dictionaryIndex = newDictionary.find(
      (dictionary) => dictionary.dictionaryId === selectedDictionaryId
    );
    if (dictionaryIndex < 0) return;
    newDictionary[dictionaryIndex] = {
      ...newDictionary[dictionaryIndex],
      ...currentDictionary,
    };
    this.dictionaries = newDictionary;

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  DeleteWord = async (id) => {
    this.dictionaries = this.dictionaries.map((dictionary) => ({
      ...dictionary,
      learnWords: dictionary.learnWords.filter((word) => word.newWordId !== id),
    }));

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  AddSynonym = async (newSynonym, wordId, dictionaryId) => {
    let currentDictionary = this.dictionaries.find(
      (dictionary) => dictionary.dictionaryId === dictionaryId
    );
    let currentWord = currentDictionary.learnWords.find(
      (word) => word.newWordId === wordId
    );

    currentWord.additionalWords.push({
      additionalWord: newSynonym,
      additionalWordId: uuidv4(),
    });

    const newDictionary = [...this.dictionaries];

    let dictionaryIndex = newDictionary.find(
      (dictionary) => dictionary.dictionaryId === dictionaryId
    );
    let wordIndex = dictionaryIndex.learnWords.find(
      (word) => word.newWordId === wordId
    );

    if (wordIndex < 0) return;
    newDictionary[wordIndex] = {
      ...newDictionary[wordIndex],
      ...currentWord,
    };
    this.dictionaries = newDictionary;

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  EditSynonym = async (synonymId, newSynonym, dictionaryId, wordId) => {
    let currentDictionary = this.dictionaries.find(
      (dictionary) => dictionary.dictionaryId === dictionaryId
    );
    let currentWord = currentDictionary.learnWords.find(
      (word) => word.newWordId === wordId
    );
    let currentSynonym = currentWord.additionalWords.findIndex(
      (synonym) => synonym.additionalWordId === synonymId
    );

    currentWord.additionalWords[currentSynonym] = {
      ...currentWord.additionalWords[currentSynonym],
      additionalWord: newSynonym,
    };

    const newDictionary = [...this.dictionaries];

    let dictionaryIndex = newDictionary.find(
      (dictionary) => dictionary.dictionaryId === dictionaryId
    );
    let wordIndex = dictionaryIndex.learnWords.find(
      (word) => word.newWordId === wordId
    );

    if (wordIndex < 0) return;
    newDictionary[wordIndex] = {
      ...newDictionary[wordIndex],
      ...currentWord,
    };
    this.dictionaries = newDictionary;

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  DeleteSynonym = async (synonymId) => {
    const newDictionary = this.dictionaries.map((dictionary) => ({
      ...dictionary,
      learnWords: dictionary.learnWords.map((word) => ({
        ...word,
        additionalWords: word.additionalWords.filter(
          (synonym) => synonym.additionalWordId !== synonymId
        ),
      })),
    }));
    this.dictionaries = newDictionary;

    await AsyncStorage.setItem(
      "dictionariesData",
      JSON.stringify(this.dictionaries)
    );
  };

  get countDictionaries() {
    return this.dictionaries.length;
  }
}

export const dictionaryStore = new Dictionaries();
