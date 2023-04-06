import CharacterControl from './CharacterControl';

export default interface CharacterInput {
  setMove: (move: CharacterControl) => void;
}
