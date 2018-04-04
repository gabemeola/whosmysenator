const senatorDB = {
  'utah': 'Mike Lee',
}

export default function findSenator(state) {
  return senatorDB[state];
}
