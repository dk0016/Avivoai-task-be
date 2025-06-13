import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { commonErrors } from 'src/constants/error';
import { User } from 'src/db/models/Users.entity';
import { DataSource } from 'typeorm';
import axios from 'axios';
import { Addresses } from 'src/db/models/Address.entity';
import { Banks } from 'src/db/models/Bank.entity';
import { Companies } from 'src/db/models/Company.entity';
import {
  UsersData,
  UserSearchQueryParams,
} from 'src/interfaces/users.interface';
import { Coordinates } from 'src/db/models/Coordinates.entity';
import { Cryptos } from 'src/db/models/Crypto.entity';
import { Hairs } from 'src/db/models/Hair.entity';
import { CompanyAddresses } from 'src/db/models/CompanyAddress.entity';
import { CompanyCordinates } from 'src/db/models/CompanyCordinates.entity';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) {}

  create = async () => {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userData = await axios.get('https://dummyjson.com/users?limit=208');
      if (!userData.data.users.length) {
        throw new Error('No data Found');
      }
      const loopMapData = userData.data.users.map(
        async (obj: UsersData, index: number) => {
          if (index > 30) {
            const addressCreate = queryRunner.manager.create(Addresses, {
              address: obj.address.address,
              city: obj.address.city,
              state: obj.address.state,
              stateCode: obj.address.stateCode,
              postalCode: obj.address.postalCode,
              country: obj.address.country,
            });
            const { id: addressId } =
              await queryRunner.manager.save(addressCreate);
            const {
              firstName,
              lastName,
              maidenName,
              age,
              gender,
              email,
              phone,
              username,
              password,
              birthDate,
              image,
              bloodGroup,
              height,
              weight,
              eyeColor,
              ip,
              macAddress,
              university,
              ein,
              ssn,
              userAgent,
              role,
            } = obj;
            const userCreate = queryRunner.manager.create(User, {
              firstName,
              lastName,
              maidenName,
              age,
              gender,
              email,
              phone,
              username,
              password,
              birthDate,
              image,
              bloodGroup,
              height,
              weight,
              eyeColor,
              ip,
              macAddress,
              university,
              ein,
              ssn,
              userAgent,
              role,
              addressId,
            });
            const { id: userId } = await queryRunner.manager.save(userCreate);

            const bankCreate = queryRunner.manager.create(Banks, {
              cardExpire: obj.bank.cardExpire,
              cardNumber: obj.bank.cardNumber,
              cardType: obj.bank.cardType,
              currency: obj.bank.currency,
              iban: obj.bank.iban,
              userId,
            });
            await queryRunner.manager.save(bankCreate);

            const companiesCreate = queryRunner.manager.create(Companies, {
              department: obj.company.department,
              name: obj.company.name,
              title: obj.company.title,
              userId,
              addressId,
            });
            await queryRunner.manager.save(companiesCreate);

            const coordinatesCreate = queryRunner.manager.create(Coordinates, {
              lat: obj.address.coordinates.lat,
              lng: obj.address.coordinates.lng,
              addressId,
            });
            await queryRunner.manager.save(coordinatesCreate);

            const cryptoCreate = queryRunner.manager.create(Cryptos, {
              coin: obj.crypto.coin,
              wallet: obj.crypto.wallet,
              network: obj.crypto.network,
              userId,
            });
            await queryRunner.manager.save(cryptoCreate);

            const hairCreate = queryRunner.manager.create(Hairs, {
              color: obj.hair.color,
              type: obj.hair.type,
              userId,
            });
            await queryRunner.manager.save(hairCreate);

            const companyAddressCreate = queryRunner.manager.create(
              CompanyAddresses,
              {
                address: obj.company.address.address,
                city: obj.company.address.city,
                state: obj.company.address.state,
                stateCode: obj.company.address.stateCode,
                postalCode: obj.company.address.postalCode,
                country: obj.company.address.country,
              },
            );
            const { id: companyAddressId } =
              await queryRunner.manager.save(companyAddressCreate);
            const companyCoordinatesCreate = queryRunner.manager.create(
              CompanyCordinates,
              {
                lat: obj.company.address.coordinates.lat,
                lng: obj.company.address.coordinates.lng,
                addressId: companyAddressId,
              },
            );
            await queryRunner.manager.save(companyCoordinatesCreate);
          }
        },
      );
      await Promise.all(loopMapData);
      await queryRunner.commitTransaction();

      return {
        message: 'All User Data Inserted',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            error instanceof Error
              ? error.message
              : commonErrors.noMessage.message,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  };

  getUsers = async (queryParams: UserSearchQueryParams) => {
    try {
      const { query: params } = queryParams;
      const Qb = this.dataSource
        .createQueryBuilder()
        .from(User, 'user')
        .leftJoinAndSelect('user.hair', 'hair')
        .leftJoinAndSelect('user.address', 'address')
        .leftJoinAndSelect('address.coordinates', 'coordinates')
        .leftJoinAndSelect('user.bank', 'bank')
        .leftJoinAndSelect('user.company', 'company')
        .leftJoinAndSelect('company.address', 'cAddress')
        .leftJoinAndSelect('cAddress.coordinates', 'cCoordinates')
        .leftJoinAndSelect('user.crypto', 'crypto')
        .select([
          'user',
          'hair.id',
          'hair.color',
          'hair.type',
          'address.id',
          'address.address',
          'address.city',
          'address.state',
          'address.stateCode',
          'address.postalCode',
          'coordinates.id',
          'coordinates.lat',
          'coordinates.lng',
          'address.country',
          'bank.id',
          'bank.cardExpire',
          'bank.cardNumber',
          'bank.cardType',
          'bank.currency',
          'bank.iban',
          'company.id',
          'company.department',
          'company.name',
          'company.title',
          'cAddress.id',
          'cAddress.address',
          'cAddress.city',
          'cAddress.state',
          'cAddress.stateCode',
          'cAddress.postalCode',
          'cCoordinates.id',
          'cCoordinates.lat',
          'cCoordinates.lng',
          'crypto.id',
          'crypto.coin',
          'crypto.wallet',
          'crypto.network',
        ])
        .where('user.id IS NOT NULL');
      if (params.id) {
        Qb.andWhere('user.id=:id', { id: params.id });
      }
      if (params.email) {
        Qb.andWhere('user.email=:email', { email: params.email });
      }
      if (params.company) {
        Qb.andWhere('(LOWER(company.name) LIKE LOWER(:company))', {
          company: `%${params.company}%`,
        });
      }
      if (params.name) {
        Qb.andWhere(
          '(LOWER(user.firstName) LIKE LOWER(:name) OR LOWER(user.lastName) LIKE LOWER(:name))',
          { name: `%${params.name}%` },
        );
      }
      Qb.addOrderBy(`user.firstName`, 'ASC');

      if (
        params.skip &&
        params.take &&
        !isNaN(params.skip) &&
        !isNaN(params.take)
      ) {
        Qb.skip(Number(params.skip)).take(Number(params.take));
      }

      const [data, total] = await Qb.getManyAndCount();

      return {
        total,
        data,
        status: HttpStatus.OK,
        message: 'success',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            error instanceof Error
              ? error.message
              : commonErrors.noMessage.message,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
