import { AbstractEntity } from "src/abstract.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { AdminRole } from "./Enum/admin.enum";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'admin_users' })
export class AdminUser extends AbstractEntity {

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  mobile_number: string;

  @Column({ enum: AdminRole })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

}