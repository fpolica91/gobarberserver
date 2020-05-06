import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from './User';
/**
 * Relationship types:
 * @OneToOne
 * @OneToMay
 * @ManyToMany
 */

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  /**
   * @ManyToOne because we are coming  from the Appointments model
   * in this case it  would translate to one provider can have many appointments
   * @JoinColumn is used to associate the provider_id with the provider model, giving
   * us full access to the provider Model
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
