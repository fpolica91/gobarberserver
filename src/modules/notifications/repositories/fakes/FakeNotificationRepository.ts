import { ObjectID } from 'mongodb'
import INotificationsRepository from '../INotificationsRepository';
import ICreateNotifactionDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification'

export default class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []
  public async create({ content, recipient_id }: ICreateNotifactionDTO): Promise<Notification> {
    const notification = new Notification()
    Object.assign(notification, { id: new ObjectID(), content, recipient_id })
    this.notifications.push(notification)
    return notification
  }
}
