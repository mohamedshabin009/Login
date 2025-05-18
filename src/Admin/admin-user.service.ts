import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AdminUser } from "./admin-user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { verifyPassword } from "src/util";
import { AdminLoginDto } from "./Dto/AdminLogin.dto";
import { CreateAdminDto } from "./Dto/CreateAdmin.dto";

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) { }

  async createSuperAdmin() {
    const superAmin = this.adminUserRepository.create({
      name: 'Application',
      email: 'admin@app.com',
      password: 'Admin@123',
      role: 'SUPER_ADMIN',
      mobile_number: '+919876543211'
    });
    await this.adminUserRepository.save(superAmin);
  }

  async findSuperAdmin() {
    return await this.adminUserRepository.count()
  }

  async findAdmin(id: string) {
    return await this.adminUserRepository.findOne({ where: { id } })
  }

  async findAdminById(id: string) {
    try {
      const admin = await this.adminUserRepository.findOne({
        where: { id }
      })
      if (!admin) throw new BadRequestException('Admin not found')

      return admin
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  async findAdminByEmail(email: string) {
    try {
      const admin = await this.adminUserRepository.findOne({
        where: { email }
      })
      if (!admin) throw new BadRequestException('Admin not found')

      return admin
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async logIn(body: AdminLoginDto) {

    const admin = await this.findAdminByEmail(body.email)
    if (!admin || ! await verifyPassword(body.password, admin.password)) {
      throw new BadRequestException('Invalid email or Password')
    }
    const { password, ...adminData } = admin
    return adminData

  }

  async createAdmin(body: CreateAdminDto) {
    try {
      const admin = await this.adminUserRepository.findOne({
        where: { email: body.email }
      })
      if (admin) throw new BadRequestException('Admin already exists')

      const createAdmin = this.adminUserRepository.create(body)
      await this.adminUserRepository.save(createAdmin)

      return {
        Success: true,
        message: 'Admin created successfully'
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getAllAdmin() {
    try {
      const admins = await this.adminUserRepository.find()
      if (!admins) throw new BadRequestException('Admin not found')

      return { success: true, admins }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

}