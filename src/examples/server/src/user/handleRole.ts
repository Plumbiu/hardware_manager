export function handleRole(invitationCode: string) {
  if(invitationCode === 'plumbiu') {
    return 0
  } else if(invitationCode === 'brickle') {
    return 1
  }
  return 2
}